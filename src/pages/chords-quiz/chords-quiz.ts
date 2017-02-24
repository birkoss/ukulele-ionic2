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
    current_chord:Chord;
    current_note:Note;
    current_type:Type;
    start:number = 1;
    labels:Array<number> = [];

    isWaiting:Boolean = false;;

    constructor(public navCtrl: NavController, public config:ConfigProvider, public data:DataProvider, public alertCtrl:AlertController) {
        this.pickChord();
    }

    public pickChord():void {
        this.current_chord = this.data.getChord('C', 'Major');
        this.isWaiting = true;
        this.start = 1;
    }

    public verifyAnswer(answer:Array<any>):void {

        let answerPositions:Array<string> = [];
        answer.filter(item => {
            answerPositions.push(item.name.name + item.fret);
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
                this.isWaiting = false;
                let alert = this.alertCtrl.create({
                    title: 'Good job!',
                    subTitle: 'It\' a valid chord!',
                    buttons: ['OK']
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

}
