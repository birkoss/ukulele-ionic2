import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { ChordsTabs } from '../pages/chords-tabs/chords-tabs';
import { ChordsQuizPage } from '../pages/chords-quiz/chords-quiz';
import { LoadingPage } from '../pages/loading/loading';

import { ConfigProvider } from '../providers/config-provider';

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
  rootPage = LoadingPage;

  chordsPages: PageInterface[] = [
    {title: 'Liste', component: ChordsTabs},
    {title: 'Favoris', component: ChordsTabs, index: 1},
    {title: 'Quiz', component: ChordsQuizPage}
  ];

  constructor(public platform: Platform, public menu: MenuController, public config:ConfigProvider) {
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
