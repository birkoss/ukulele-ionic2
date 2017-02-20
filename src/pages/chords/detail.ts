import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { DetailOptionsPopover } from './popovers/detail-options';

import { Chord } from '../../classes/chord';
import { Note } from '../../classes/note';
import { Type } from '../../classes/type';

@Component({
    selector: "chords-detail",
    templateUrl: "detail.html",
})

export class ChordsDetailPage {
    note: Note;
    type: Type;
    chord: Chord;

    constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public data: DataProvider, public popoverCtrl: PopoverController, public favorites:FavoritesProvider) {
        this.note = navParams.get('note');
        this.type = navParams.get('type');

        this.chord = data.getChords(this.type.name)[0];
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create(DetailOptionsPopover);
        popover.present({
            ev: event
        });
    }

    public addToFavorite(chord:Chord, index:Number): void {
        this.favorites.add({'note':chord.note.name, 'type':chord.type.name, 'position':index});
    }

    public isFavorite(chord:Chord, index:Number): Boolean {
        return this.favorites.exists({'note':chord.note.name, 'type':chord.type.name, 'position':index});
    }
    
    public removeToFavorite(chord:Chord, index:Number): void {
        this.favorites.remove(this.favorites.getIndex({'note':chord.note.name, 'type':chord.type.name, 'position':index}));
    }
}
