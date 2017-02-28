import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

import { ChordsQuizPage } from '../../pages/chords-quiz/chords-quiz';
import { NotesTabs } from '../../pages/notes-tabs/notes-tabs';

@Component({
    template: '[...]',
})
export class LoadingPage {

    constructor(public navCtrl: NavController, private data:DataProvider, private config:ConfigProvider) { }

    ionViewWillEnter() {
        this.config.init().then(data => {
            this.navCtrl.setRoot(NotesTabs);
        });
    }
}
