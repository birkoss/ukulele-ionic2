import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { TranslateService } from 'ng2-translate';

import { ChordsTabs } from '../pages/chords-tabs/chords-tabs';
import { ChordsQuizPage } from '../pages/chords-quiz/chords-quiz';

import { NotesTabs } from '../pages/notes-tabs/notes-tabs';
import { NotesQuizPage } from '../pages/notes-quiz/notes-quiz';

import { ScalesListPage } from '../pages/scales-list/scales-list';

import { SettingsPage } from '../pages/settings/settings';

import { ConfigProvider } from '../providers/config-provider';
import { DataProvider } from '../providers/data-provider';
import { FavoritesProvider } from '../providers/favorites-provider';

export interface PageInterface {
    title: string;
    component: any;
    index?: number;
    changeRoot?: Boolean;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage:Component;

    chordsPages: PageInterface[] = [
        {title: 'List', component: ChordsTabs},
        {title: 'Favorites', component: ChordsTabs, index: 1},
        {title: 'Quiz', component: ChordsQuizPage}
    ];

    notesPages: PageInterface[] = [
        {title: 'List', component: NotesTabs},
        {title: 'Favorites', component: NotesTabs, index: 1},
        {title: 'Quiz', component: NotesQuizPage}
    ];

    scalesPages:PageInterface[] = [
        {title:'List', component:ScalesListPage}
    ];

    settingsPage:PageInterface[] = [
        {title:'Settings', component:SettingsPage, changeRoot:false}
    ];

    currentPage:PageInterface;

    constructor(public platform:Platform, public menu:MenuController, public config:ConfigProvider, public favorites:FavoritesProvider, public data:DataProvider, public translate:TranslateService) {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();

            translate.setDefaultLang('en');
            this.favorites.load().then(result => {
                this.data.load().then(result => {
                    this.config.load().then(result => {
                        translate.use(this.config.general['language']).subscribe(data => {
                            this.rootPage = ChordsTabs;
                        });
                    });
                });
            });
        });
    }

    openPage(page) {
        this.currentPage = page;

        this.menu.close();

        if (!page.changeRoot) {
            this.nav.push(page.component);
        } else {
            if (page.index) {
                this.nav.setRoot(page.component, {tabIndex: page.index});
            } else {
                this.nav.setRoot(page.component);
            }
        }
    }
}
