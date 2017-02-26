import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { ChordsTabs } from '../pages/chords-tabs/chords-tabs';
import { ChordsQuizPage } from '../pages/chords-quiz/chords-quiz';

export interface PageInterface {
    title: string;
    component: any;
    index?: number;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

  //rootPage = ChordsTabs;
  rootPage = ChordsQuizPage;

  chordsPages: PageInterface[] = [
    {title: 'List', component: ChordsTabs},
    {title: 'Favorites', component: ChordsTabs, index: 1},
    {title: 'Quiz', component: ChordsQuizPage}
  ];

  constructor(public platform: Platform, public menu: MenuController) {
    this.init();
  }

  init() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.menu.close();

    if (page.index) {
        this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
        this.nav.setRoot(page.component);
    }
  }
}
