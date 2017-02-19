import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ChordsListPage } from '../list';
import { ChordsFavoritesPage } from '../favorites/favorites';

@Component({
    templateUrl: 'tabs.html'
})

export class ChordsTabs {
    tabListRoot: any = ChordsListPage;
    tabFavoritesRoot: any = ChordsFavoritesPage;

    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}
