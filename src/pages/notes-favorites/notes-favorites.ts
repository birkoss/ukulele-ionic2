import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { Favorites } from '../../providers/favorites';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/Position';

@Component({
    selector: 'notes-favorites',
    templateUrl: 'notes-favorites.html'
})
export class NotesFavoritesPage {
    favorites:Array<Object> = [];

    constructor(public navCtrl: NavController, public dataProvider: DataProvider, private config: ConfigProvider, public popoverCtrl: PopoverController, private favoritesService:Favorites) { }

    ngOnInit() {
        /*
        console.log('ngOnInit....');
        this.favoritesService.favorites.subscribe(favorites => {
            console.log(favorites);
            console.log('off!');
            this.favorites = favorites;
        });

        this.favoritesService.load();
        */
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create(ChordsOptionsPopover);
        popover.present({
            ev: event
        });
    }

    public showDetail(chord:Object): void {
        this.navCtrl.push(ChordsDetailPage, {note: chord['note'], type:chord['type'], 'position':chord['position']});
    }
}
