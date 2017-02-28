import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsFiltersPopover } from '../../popovers/chords-filters/chords-filters';
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
        this.dataService.getNotes().subscribe(notes => {
            this.notes = notes;
        });
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create((type == 'filters' ? ChordsFiltersPopover : ChordsOptionsPopover));
        popover.present({
            ev: event
        });
    }
}
