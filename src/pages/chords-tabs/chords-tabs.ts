import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ChordsListPage } from '../../pages/chords-list/chords-list';
import { ChordsFavoritesPage } from '../../pages/chords-favorites/chords-favorites';

@Component({
    templateUrl: 'chords-tabs.html'
})

export class ChordsTabs {
    tabListRoot: any = ChordsListPage;
    tabFavoritesRoot: any = ChordsFavoritesPage;

    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}
