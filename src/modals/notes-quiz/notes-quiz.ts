import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { FavoritesProvider } from '../../providers/favorites-provider';
import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'notes-quiz-modal',
    templateUrl: 'notes-quiz.html'
})

export class NotesQuizModal {
    clefs:Array<Note> = [];
    parent:any;

    constructor(public viewCtrl:ViewController, private data:DataProvider, public config:ConfigProvider, public favorites:FavoritesProvider, public params:NavParams) {
        this.parent = this.params.get('parent');
    }

    ionViewWillEnter() {
        this.clefs = this.data.getClefs();
    }

    close() {
        this.viewCtrl.dismiss();
    }

    onFilterChanged(element) {
        this.config.save();
        this.parent.generateList();
    }
}
