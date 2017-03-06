import { Component } from '@angular/core';

import { ModalController, NavController, AlertController, PopoverController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { GeneralPopover } from '../../popovers/general/general';

import { NotesQuizModal } from '../../modals/notes-quiz/notes-quiz'

import { Note } from '../../classes/note';

@Component({
    selector: 'notes-quiz',
    templateUrl: 'notes-quiz.html'
})
export class NotesQuizPage {
    questionIndex:number = 0;
    questions:Array<Object> = [];
    current_question:Object;

    isPlaying:Boolean = false;
    isDone:Boolean = false;
    isWaiting:Boolean = true;

    answers:Array<Note> = [];
    goodAnswer:number;
    wrongAnswers:Array<number> = [];

    constructor(public navCtrl:NavController, public config:ConfigProvider, public data:DataProvider, public alertCtrl:AlertController, public popoverCtrl:PopoverController, public modalCtrl:ModalController, public favorites:FavoritesProvider) { }

    ionViewWillEnter() {
        this.generateList();
    }

    public reset():void {
        this.isDone = false;
        this.isPlaying = false;
    }

    private startQuiz():void {
        this.goodAnswer = 0;
        this.generateList();
        this.questionIndex = 0;

        this.isPlaying = true;
        this.pickNote();
    }

    private generateList() {
        this.questions = [];

        this.data.getClefs().forEach(clef => {
            if (this.config.isEmpty(this.config.notes['quiz_clefs']) || this.config.notes['quiz_clefs'][clef.letter['name']]) {
                this.data.getNotes().forEach(note => {
                    let n:Object = {
                        clef:clef,
                        note:note,
                        position:0
                    };

                    if (!this.config.notes['quiz_flat'] && note.accidental < 0) { n = null; }

                    if (!this.config.notes['quiz_sharp'] && note.accidental > 0) { n = null; }

                    if (this.favorites.all('notes').length > 0 && this.config.notes['quiz_favorites']) {
                        for (let position:number=1; position<=2; position++) {
                            if (this.hasFavorited(clef, note, position)) {
                                let f:Object = Object.assign({}, n);
                                f['position'] = position;
                                this.questions.push(f);
                            }
                        }
                    }
                    else {
                        if (n != null) {
                            this.questions.push(n);
                        }
                    }
                });
            }
        });

        this.shuffle(this.questions);
    }

    private hasFavorited(clef:Note, note:Note, position:number):Boolean {
        let favorited:Boolean = false;
        this.favorites.all('notes').filter(favorite => {
            if (favorite['letter'] == note.letter['name'] && favorite['accidental'] == note.accidental && favorite['clef'] == clef.letter['name'] && favorite['position'] == position) {
                favorited = true;
            }
        });
        return favorited;
    }

    public pickNote():void {
        this.answers = [];
        this.wrongAnswers = [];

        if (this.isLastQuestion()) {
            this.isDone = true;
        } else {
            this.current_question = this.questions[this.questionIndex];
            this.isWaiting = true;

            this.questionIndex++;

            this.answers.push(this.current_question['note']);
            /* @todo Better finding the answers without looping 10 times: Build a pre-generated array first */
            while (this.answers.length < 5) {
                let note:Note = this.data.pickNote();

                let exists:Boolean = false;
                this.answers.forEach(answer => {
                    if (note.letter['name'] == answer.letter['name'] && note.accidental == answer.accidental) {
                        exists = true;
                    }
                });
                if (exists) {
                    continue;
                }

                if (!this.config.notes['quiz_flat'] && note.accidental < 0) { continue; }
                if (!this.config.notes['quiz_sharp'] && note.accidental > 0) { continue; }

                this.answers.push(note);
            }
            
            this.shuffle(this.answers);
        }
    }

    public isLastQuestion():Boolean {
        return (this.questionIndex >= this.questions.length);
    }

    public tryAnswer(index:number):void {
        if (this.current_question['note'].letter['name'] == this.answers[index].letter['name'] && this.current_question['note'].accidental == this.answers[index].accidental) {
            if (this.wrongAnswers.length == 0) {
                this.goodAnswer++;
            }

            let alert = this.alertCtrl.create({
                title: 'Bravo!',
                subTitle: 'C\'est la bonne note!',
                enableBackdropDismiss: false,
                buttons: [{
                    text: 'OK',
                    handler: data => {
                        this.pickNote();
                    }
                }]
            });
            alert.present();
        } else {
            this.wrongAnswers.push(index);
        }
    }

    private shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }

    public showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    public showConfiguration() {
        let modal = this.modalCtrl.create(NotesQuizModal, {parent:this});
        modal.present();
    }

}
