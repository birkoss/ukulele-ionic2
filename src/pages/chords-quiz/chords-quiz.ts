import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';
import { Type } from '../../classes/type';
import { Chord } from '../../classes/chord';
import { Position } from '../../classes/position';

@Component({
    selector: 'chords-quiz',
    templateUrl: 'chords-quiz.html'
})
export class ChordsQuizPage {
    chordIndex:number = 0;
    chords:Array<Chord> = [];

    current_chord:Chord;
    current_note:Note;
    current_type:Type;
    start:number = 1;
    labels:Array<number> = [];
    position:Position;

    isWaiting:Boolean = false;

    constructor(public navCtrl: NavController, public config:ConfigProvider, public data:DataProvider, public alertCtrl:AlertController) {
        this.generateList();
        this.pickChord();
    }

    private generateList():void {
        this.chords = [];
        this.chordIndex = 0;

        this.data.getChords().filter(item => {
            this.chords.push(item);
        });

        this.shuffle(this.chords);
    }

    public pickChord():void {
        this.current_chord = this.chords[this.chordIndex];
        this.isWaiting = true;
        this.start = 1;

        /* When the last chord is reach, shuffle the list and start again */
        this.chordIndex++;
        if (this.chordIndex >= this.chords.length) {
            this.shuffle(this.chords);
            this.chordIndex = 0;
        }
    }

    public showSolution(index:number = 0):void {
        this.position = this.current_chord.positions[index];
        this.isWaiting = false;
    }

    public verifyAnswer(answer:Array<any>):void {
        let answerPositions:Array<string> = [];
        answer.filter(item => {
            answerPositions.push(item.string + (item.fret + this.start - 1));
        });
        answerPositions.sort();

        for (let i:number=0; i<this.current_chord.positions.length; i++) {
            let chordPositions:Array<string> = [];
            this.current_chord.positions[i].strings.filter(item => {
                if (item.fret > 0) {
                    chordPositions.push(item.name.name + item.fret);
                }
            });
            chordPositions.sort();

            if (answerPositions.toString() === chordPositions.toString()) {
                let alert = this.alertCtrl.create({
                    title: 'Good job!',
                    subTitle: 'It\' a valid chord!',
                    enableBackdropDismiss: false,
                    buttons: [{
                        text: 'OK',
                        handler: data => {
                            this.showSolution(i);
                        }
                    }]
                });
                alert.present();
                break;
            }
        }
    }

    public moveFret(direction:number):void {
        this.start += direction;
    }

    private updateLabels():void {
        this.labels = [];
        for (let i:number=0; i<4; i++) {
            this.labels.push(this.start+i);
        }
    }

    private shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }

}
