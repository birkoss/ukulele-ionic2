import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { NotesFiltersPopover } from '../../popovers/notes-filters/notes-filters';
import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { Data } from '../../providers/data';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { Note } from '../../classes/note';

@Component({
  selector: 'notes-list',
  templateUrl: 'notes-list.html',
})
export class NotesListPage {
    notes:Array<Note>;

    constructor(public navCtrl:NavController, public popoverCtrl:PopoverController, private dataProvider:DataProvider, private config:ConfigProvider, private dataService:Data) {
    }

    ionViewDidEnter() {
        this.generateList();
    }

    private showPopup(event, type:string) {
        let popover = this.popoverCtrl.create((type == 'filters' ? NotesFiltersPopover : ChordsOptionsPopover));
        popover.onDidDismiss(data => {
            this.generateList();
        });
        popover.present({
            ev: event
        });
    }

    private generateList() {
        this.notes = this.dataProvider.getNotes().filter(note => {
            if (!this.config.NotesFilters['list_use_flat'] && note.name[1] == "♭") { return false; }
            if (!this.config.NotesFilters['list_use_sharp'] && note.name[1] == "♯") { return false; }

            return true;
        });
    }
}
