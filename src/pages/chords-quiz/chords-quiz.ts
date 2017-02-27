import { Component } from '@angular/core';

import { ModalController, NavController, AlertController, PopoverController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { ChordsFiltersPopover } from '../../popovers/chords-filters/chords-filters';
import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { ChordsQuizModal } from '../../modals/chords-quiz/chords-quiz'

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

    isPlaying:Boolean = false;
    isDone:Boolean = false;
    isWaiting:Boolean = true;

    current_chord:Chord;
    current_note:Note;
    current_type:Type;
    start:number = 1;
    labels:Array<number> = [];
    position:Position;

    goodAnswer:number;

    constructor(public navCtrl: NavController, public config:ConfigProvider, public data:DataProvider, public alertCtrl:AlertController, public popoverCtrl:PopoverController, public modalCtrl:ModalController, public favorites:FavoritesProvider) {
        console.log('ChordsQuizPage()');
    }

    ionViewWillEnter() {
        console.log('ionViewDidEnter()');
        /* Pick all chord type if no quiz options exists */
        if (Object.keys(this.config.ChordsFilters['quiz_chord_types']).length == 0) {
            console.log("Not options...");
            console.log(this.config.ChordsFilters['quiz_chord_types']);
            for (let key in this.data.types) {
                this.config.ChordsFilters['quiz_chord_types'][this.data.types[key].name] = true;
            }
            this.config.save();
        }
    }

    public reset():void {
        this.isDone = false;
        this.isPlaying = false;
    }

    private startQuiz():void {
        this.goodAnswer = 0;
        this.chords = this.getChords();
        this.chordIndex = 0;
        this.shuffle(this.chords);

        this.isPlaying = true;
        this.pickChord();
    }

    private getChords():Array<Chord> {
        return this.data.getChords().filter(item => {

            if (!this.config.ChordsFilters['quiz_chord_types'][item.type.name]) { return false; }

            if (!this.config.ChordsFilters['quiz_use_flat'] && item.note.name.substr(1) == '♭') { return false; }

            if (!this.config.ChordsFilters['quiz_use_sharp'] && item.note.name.substr(1) == '♯') { return false; }

            if (this.favorites.all().length > 0) {
                if (this.config.ChordsFilters['quiz_use_favorites']) {
                    return this.hasFavorited(item.note.name, item.type.name);
                }
            }
            
            return true;
        });
    }

    private hasFavorited(noteName:string, typeName:string):Boolean {
        let favorited:Boolean = false;
        this.favorites.all().filter(item => {
            if (item['note'] == noteName && item['type'] == typeName) {
                favorited = true;
            }
        });
        return favorited;
    }

    public pickChord():void {
        if (this.isLastQuestion()) {
            this.isDone = true;
        } else {
            this.current_chord = this.chords[this.chordIndex];
            this.isWaiting = true;
            this.start = 1;

            this.chordIndex++;
        }
    }

    public isLastQuestion():Boolean {
        return (this.chordIndex >= this.chords.length);
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
                this.goodAnswer++;
                let alert = this.alertCtrl.create({
                    title: 'Bravo!',
                    subTitle: 'C\'est un bon accord!',
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

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create((type == 'filters' ? ChordsFiltersPopover : ChordsOptionsPopover));
        popover.present({
            ev: event
        });
    }

    public showConfiguration() {
        let modal = this.modalCtrl.create(ChordsQuizModal);
        modal.present();
    }

}
