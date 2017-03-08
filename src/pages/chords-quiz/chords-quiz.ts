import { Component } from '@angular/core';

import { ModalController, NavController, AlertController, PopoverController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { GeneralPopover } from '../../popovers/general/general';

import { ChordsQuizModal } from '../../modals/chords-quiz/chords-quiz'

import { Position } from '../../classes/position';

@Component({
    selector: 'chords-quiz',
    templateUrl: 'chords-quiz.html'
})
export class ChordsQuizPage {
    questions:Array<Object> = [];
    questionIndex:number = 0;
    current_question:Object;

    isPlaying:Boolean = false;
    isDone:Boolean = false;
    isWaiting:Boolean = true;

    start:number = 1;
    labels:Array<number> = [];
    position:Position;

    goodAnswer:number;

    constructor(public navCtrl:NavController, public config:ConfigProvider, public data:DataProvider, public alertCtrl:AlertController, public popoverCtrl:PopoverController, public modalCtrl:ModalController, public favorites:FavoritesProvider) {
    }

    ionViewWillEnter() {
        this.generateList();
    }

    generateList() {
        this.questions = [];

        this.data.getForms().forEach(form => {
            if (this.config.isEmpty(this.config.chords['quiz_forms']) || this.config.chords['quiz_forms'][form['type']+'-'+form['quality']]) {
                this.data.getNotes().forEach(note => {
                    let n:Object = {
                        note:note,
                        form:form
                    };

                    if (!this.config.chords['quiz_flat'] && note.accidental < 0) { n = null; }

                    if (!this.config.chords['quiz_sharp'] && note.accidental > 0) { n = null; }

                    if (this.favorites.all('chords').length > 0 && this.config.chords['quiz_favorites']) {
                        this.favorites.all('chords').forEach(favorite => {
                            if (favorite['letter'] == note.letter['name'] && favorite['accidental'] == note.accidental && favorite['type'] == form['type'] && favorite['quality'] == form['quality']) {
                                if (n != null) {
                                    this.questions.push(n);
                                    n = null;
                                }
                            }
                        });
                    } else {
                        if (n != null) {
                            this.questions.push(n);
                        }
                    }
                });
            }
        });
    }

    showConfiguration() {
        let modal = this.modalCtrl.create(ChordsQuizModal, {parent:this});
        modal.present();
    }

    shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }

    startQuiz() {
        this.goodAnswer = 0;
        this.generateList();
        this.questionIndex = 0;

        this.isPlaying = true;
        this.pickQuestion();
    }

    pickQuestion() {
        if (this.isLastQuestion()) {
            this.isDone = true;
        } else {
            this.current_question = this.questions[this.questionIndex];
            this.isWaiting = true;

            this.questionIndex++;
        }
    }

    isLastQuestion():Boolean {
        return (this.questionIndex >= this.questions.length);
    }

    verifyAnswer(answer:Array<any>) {
        let answerPositions:Array<string> = [];
        answer.filter(item => {
            answerPositions.push(item.string + (item.fret + this.start - 1));
        });
        answerPositions.sort();

        let solution:Position;
        this.data.getChord(this.current_question['note'], this.current_question['form']).positions.forEach(position => {
            let chordPositions:Array<string> = [];
            position.strings.filter(item => {
                if (item['fret'] > 0) {
                    chordPositions.push(item['string'] + item['fret']);
                }
            });
            chordPositions.sort();

            if (answerPositions.toString() === chordPositions.toString()) {
                this.goodAnswer++;
                solution = position;
            }
        });

        if (solution) {
            let alert = this.alertCtrl.create({
                title: 'Bravo!',
                subTitle: 'C\'est un bon accord!',
                enableBackdropDismiss: false,
                buttons: [{
                    text: 'OK',
                    handler: data => {
                        this.showSolution(solution);
                    }
                }]
            });
            alert.present();
        }
    }

    showSolution(position:Position) {
        this.position = position;
        this.isWaiting = false;
    }

    moveFret(direction:number) {
        this.start += direction;
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    reset() {
        this.isDone = false;
        this.isPlaying = false;
    }
}
