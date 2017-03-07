import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { FavoritesProvider } from '../../providers/favorites-provider';
import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    selector: 'chords-quiz-modal',
    templateUrl: 'chords-quiz.html'
})

export class ChordsQuizModal {
    forms:Array<Object> = [];
    parent:any;

    constructor(public viewCtrl:ViewController, public params:NavParams, private data:DataProvider, private config:ConfigProvider, public favorites:FavoritesProvider) {
        this.parent = this.params.get('parent');
    }

    ionViewWillEnter() {
        this.forms = this.data.getForms();
        console.log(this.forms);
    }

    close() {
        this.viewCtrl.dismiss();
    }

    onFilterChanged(element, element_value) {
        this.config.save();
        this.parent.generateList();
    }
}
