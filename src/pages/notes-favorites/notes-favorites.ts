import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/Position';

@Component({
    selector: 'notes-favorites',
    templateUrl: 'notes-favorites.html'
})
export class NotesFavoritesPage {
    favorites:Array<Object> = [];

    constructor(public navCtrl: NavController, public dataProvider: DataProvider, private config: ConfigProvider, public popoverCtrl: PopoverController, private favoritesService:FavoritesProvider) { }

    ionViewDidEnter() {
        this.generateList();
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create(ChordsOptionsPopover);
        popover.present({
            ev: event
        });
    }

    public generateList() {
        this.favorites = this.favoritesService.all('notes');
    }

    public showDetail(chord:Object): void {
        this.navCtrl.push(ChordsDetailPage, {note: chord['note'], type:chord['type'], 'position':chord['position']});
    }
}
