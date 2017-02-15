import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
    templateUrl:'tabs.html'
})

export class TabsPage {
    tab1Root: any = HomePage;

    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}
