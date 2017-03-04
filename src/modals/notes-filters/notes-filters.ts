import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { FavoritesProvider } from '../../providers/favorites-provider';
import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    selector: 'notes-filters-modal',
    templateUrl: 'notes-filters.html'
})

export class NotesFiltersModal {
    parent:any;

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider, public favorites:FavoritesProvider, public params:NavParams) {
        this.parent = this.params.get('parent');
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
