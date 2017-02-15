import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { HomePage } from '../../home/home';

import { ChordsListPage } from '../list/list';

@Component({
    templateUrl: 'tabs.html'
})

export class ChordsTabs {
    tabListRoot: any = ChordsListPage;
    tabFavoritesRoot: any = HomePage;

    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}
