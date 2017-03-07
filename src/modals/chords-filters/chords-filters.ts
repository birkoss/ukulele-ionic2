import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { FavoritesProvider } from '../../providers/favorites-provider';
import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'chords-filters-modal',
    templateUrl: 'chords-filters.html'
})

export class ChordsFiltersModal {
    clefs:Array<Note> = [];
    parent:any;

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider, public favorites:FavoritesProvider, public params:NavParams) {
        this.parent = this.params.get('parent');
    }

    ionViewDidEnter() {
        this.clefs = this.data.getClefs();
    }

    close() {
        this.viewCtrl.dismiss();
    }

    onChanged() {
        console.log('On Changed!');
        this.config.save();
        this.parent.generateList();
    }
}
