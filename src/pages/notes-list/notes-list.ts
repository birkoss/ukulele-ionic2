import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { GeneralPopover } from '../../popovers/general/general';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
  selector: 'notes-list',
  templateUrl: 'notes-list.html',
})
export class NotesListPage {
    notes:Array<Note>;

    constructor(public navCtrl:NavController, public popoverCtrl:PopoverController, private data:DataProvider, private config:ConfigProvider) { }

    ionViewDidEnter() {
        this.generateList();
    }


    generateList() {
        this.notes = this.data.getNotes().filter(note => {
            if (!this.config.NotesFilters['list_use_flat'] && note.name[1] == "♭") { return false; }
            if (!this.config.NotesFilters['list_use_sharp'] && note.name[1] == "♯") { return false; }

            return true;
        });
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }
}
