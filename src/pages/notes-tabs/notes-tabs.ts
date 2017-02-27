import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { NotesListPage } from '../../pages/notes-list/notes-list';
import { ChordsFavoritesPage } from '../../pages/chords-favorites/chords-favorites';

@Component({
    templateUrl: 'notes-tabs.html'
})

export class NotesTabs {
    tabListRoot: any = NotesListPage;
    tabFavoritesRoot: any = ChordsFavoritesPage;

    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}
