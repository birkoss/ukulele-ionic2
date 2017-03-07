import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { GeneralPopover } from '../../popovers/general/general';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { Chord } from '../../classes/chord';
import { Note } from '../../classes/note';
import { Position } from '../../classes/Position';

@Component({
    selector: 'chords-favorites',
    templateUrl: 'chords-favorites.html'
})
export class ChordsFavoritesPage {
    chords:Array<Object> = [];

    constructor(public navCtrl:NavController, public data:DataProvider, private config:ConfigProvider, private favorites:FavoritesProvider, public popoverCtrl:PopoverController) { }

    ionViewDidEnter() {
        this.generateList();
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    generateList() {
        this.chords = [];

        this.favorites.all('chords').forEach(favorite => {
            let note:Note = this.data.getNote(favorite['letter'], favorite['accidental']);
            let form:Object = this.data.getForm(favorite['type'], favorite['quality']);

            let chord:Chord = this.data.getChord(note, form);

            this.chords.push({
                note:note,
                form:form,
                position:chord.positions[favorite['position']]
            });
        });
    }

    showDetail(chord:Object) {
        console.log(chord);
        this.navCtrl.push(ChordsDetailPage, {chord: chord['chord']});
    }
}
