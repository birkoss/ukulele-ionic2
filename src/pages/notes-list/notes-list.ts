import { Component } from '@angular/core';

import { ModalController, NavController, PopoverController } from 'ionic-angular';

import { GeneralPopover } from '../../popovers/general/general';

import { NotesFiltersModal } from '../../modals/notes-filters/notes-filters';

import { NotesDetailPage } from '../../pages/notes-detail/notes-detail';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
  selector: 'notes-list',
  templateUrl: 'notes-list.html',
})
export class NotesListPage {
    notes:Array<Note>;

    constructor(public navCtrl:NavController, public popoverCtrl:PopoverController, private data:DataProvider, private config:ConfigProvider, private modalCtrl:ModalController) { }

    ionViewDidEnter() {
        this.generateList();
    }

    generateList() {
        console.log(this.config.notes);
        this.notes = [];
        this.notes = this.data.getNotes().filter(note => {
            if (!this.config.notes['list_flat'] && note.accidental < 0) { return false; }
            if (!this.config.notes['list_sharp'] && note.accidental > 0) { return false; }

            return true;
        });
    }

    onCardClicked(element) {
        this.navCtrl.push(NotesDetailPage, {note:element['note']});
    }

    showModal(event) {
        let modal = this.modalCtrl.create(NotesFiltersModal, {'parent':this});
        modal.present();
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover, {parent:this});
        popover.present({
            ev: event
        });
    }
}
