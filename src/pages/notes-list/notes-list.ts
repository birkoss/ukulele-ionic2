import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsFiltersPopover } from '../../popovers/chords-filters/chords-filters';
import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

import { Note } from '../../classes/note';

@Component({
  selector: 'notes-list',
  templateUrl: 'notes-list.html',
})
export class NotesListPage {

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private dataProvider: DataProvider, private config: ConfigProvider) {
    }

    public getNotes() : Array<Note> {
        return this.dataProvider.getNotes();
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create((type == 'filters' ? ChordsFiltersPopover : ChordsOptionsPopover));
        popover.present({
            ev: event
        });
    }
}
