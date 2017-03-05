import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { NotesDetailPage } from '../notes-detail/notes-detail';

import { GeneralPopover } from '../../popovers/general/general';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

@Component({
    selector: 'notes-favorites',
    templateUrl: 'notes-favorites.html'
})
export class NotesFavoritesPage {
    notes:Array<Object> = [];

    constructor(public navCtrl:NavController, public data:DataProvider, private config:ConfigProvider, public popoverCtrl:PopoverController, private favorites:FavoritesProvider) { }

    ionViewDidEnter() {
        this.generateList();
    }

    public showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    public generateList() {
        this.notes = [];

        this.favorites.all('notes').forEach(favorite => {
            this.notes.push({
                'note':this.data.getNote(favorite['letter'], favorite['accidental']),
                'position':favorite['position'],
                'clef':favorite['clef']
            });
        });
    }

    public onCardClicked(element) {
        console.log(element);
        this.navCtrl.push(NotesDetailPage, {note:element['note'], clef:element['clef'], position:element['position']});
    }
}
