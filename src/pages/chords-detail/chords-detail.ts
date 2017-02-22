import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { DetailOptionsPopover } from '../../popovers/detail-options/detail-options';

import { Chord } from '../../classes/chord';
import { Note } from '../../classes/note';
import { Type } from '../../classes/type';

@Component({
    selector: "chords-detail",
    templateUrl: "chords-detail.html",
})

export class ChordsDetailPage {
    @ViewChild(Content) content: Content;

    note: Note;
    type: Type;
    position: number = 0;
    chord: Chord;

    constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public data: DataProvider, public popoverCtrl: PopoverController, public favorites:FavoritesProvider) {
        this.note = navParams.get('note');
        this.type = navParams.get('type');

        if (navParams.get('position') != undefined) {
            this.position = navParams.get('position');
        }

        this.chord = data.getChord(this.note.name, this.type.name);
    }

    ngAfterViewChecked() {
        if (this.position > 0) {
            this.scrollToElement('position_' + this.position);
        }
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

    scrollToElement(id) { 
        let el = document.getElementById(id);
        if (el != undefined) {
            var rect = el.getBoundingClientRect();
            this.content.scrollTo(0, rect.top);
            //this.content.scrollTo(0, rect.top, 800);
        }
    }

    public getStrings():Array<any> {
        return this.chord.positions[0].strings;
    }
}
