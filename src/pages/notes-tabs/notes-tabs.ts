import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { NotesListPage } from '../../pages/notes-list/notes-list';
import { NotesFavoritesPage } from '../../pages/notes-favorites/notes-favorites';

@Component({
    templateUrl: 'notes-tabs.html'
})

export class NotesTabs {
    tabListRoot: any = NotesListPage;
    tabFavoritesRoot: any = NotesFavoritesPage;

    mySelectedIndex: number;

    constructor(navParams: NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}
