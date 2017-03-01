import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { ChordsTabs } from '../pages/chords-tabs/chords-tabs';
import { ChordsQuizPage } from '../pages/chords-quiz/chords-quiz';
import { LoadingPage } from '../pages/loading/loading';

import { NotesTabs } from '../pages/notes-tabs/notes-tabs';

import { ConfigProvider } from '../providers/config-provider';
import { DataProvider } from '../providers/data-provider';
import { FavoritesProvider } from '../providers/favorites-provider';

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

    //rootPage = LoadingPage;
    rootPage:Component;

    chordsPages: PageInterface[] = [
        {title: 'Liste', component: ChordsTabs},
        {title: 'Favoris', component: ChordsTabs, index: 1},
        {title: 'Quiz', component: ChordsQuizPage}
    ];

    notesPages: PageInterface[] = [
        {title: 'Liste', component: NotesTabs},
        {title: 'Favoris', component: NotesTabs, index: 1},
        {title: 'Quiz', component: ChordsQuizPage}
    ];

    constructor(public platform: Platform, public menu: MenuController, public config:ConfigProvider, public favorites:FavoritesProvider, public data:DataProvider) {
        this.init();
    }

    init() {
        console.log('App.init...');
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
            this.favorites.load().then(result => {
                console.log('favorites.loaded?' + result);
                this.data.load().then(result => {
                    this.config.load().then(result => {
                        console.log('data.loaded?');
                        this.rootPage = ChordsTabs;
                    });
                });
            });
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
