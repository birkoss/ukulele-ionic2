import { Component } from '@angular/core';

import { ModalController, NavController, AlertController, PopoverController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { ChordsFiltersPopover } from '../../popovers/chords-filters/chords-filters';
import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { NotesQuizModal } from '../../modals/notes-quiz/notes-quiz'

import { Note } from '../../classes/note';

@Component({
    selector: 'notes-quiz',
    templateUrl: 'notes-quiz.html'
})
export class NotesQuizPage {
    noteIndex:number = 0;
    notes:Array<Note> = [];

    isPlaying:Boolean = false;
    isDone:Boolean = false;
    isWaiting:Boolean = true;

    current_note:Note;

    goodAnswer:number;

    answers:Array<Note> = [];

    constructor(public navCtrl: NavController, public config:ConfigProvider, public data:DataProvider, public alertCtrl:AlertController, public popoverCtrl:PopoverController, public modalCtrl:ModalController, public favorites:FavoritesProvider) { }

    public reset():void {
        this.isDone = false;
        this.isPlaying = false;
    }

    private startQuiz():void {
        this.goodAnswer = 0;
        this.notes = this.getNotes();
        this.noteIndex = 0;
        this.shuffle(this.notes);

        this.isPlaying = true;
        this.pickNote();
    }

    private getNotes():Array<Note> {
        return this.data.getNotes().filter(item => {

            if (!this.config.NotesFilters['quiz_use_flat'] && item.name.substr(1) == '♭') { return false; }

            if (!this.config.NotesFilters['quiz_use_sharp'] && item.name.substr(1) == '♯') { return false; }

            if (this.favorites.all().length > 0) {
                if (this.config.NotesFilters['quiz_use_favorites']) {
                    return this.hasFavorited(item.name, item.direction);
                }
            }
            
            return true;
        });
    }

    private hasFavorited(noteName:string, direction:string):Boolean {
        let favorited:Boolean = false;
        this.favorites.all('notes').filter(item => {
            if (item['note'] == noteName && item['direction'] == direction) {
                favorited = true;
            }
        });
        return favorited;
    }

    public pickNote():void {
        this.answers = [];

        if (this.isLastQuestion()) {
            this.isDone = true;
        } else {
            this.current_note = this.notes[this.noteIndex];
            this.isWaiting = true;

            this.noteIndex++;

            this.answers.push(this.current_note);
            while (this.answers.length < 5) {
                let note:Note = this.data.pickNote();
                if (this.answers.indexOf(note) == -1) {
                    this.answers.push(note);
                }
            }
            
            this.shuffle(this.answers);
        }

        console.log(this.isWaiting);
        console.log(this.isLastQuestion());
    }

    public isLastQuestion():Boolean {
        return (this.noteIndex >= this.notes.length);
    }

    public showSolution(index:number = 0):void {
        //this.position = this.current_chord.positions[index];
        this.isWaiting = false;
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
        let modal = this.modalCtrl.create(NotesQuizModal);
        modal.present();
    }

}
