import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { GeneralPopover } from '../../popovers/general/general';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/position';
import { Note } from '../../classes/note';

@Component({
    selector: "chords-detail",
    templateUrl: "chords-detail.html",
})

export class ChordsDetailPage {
    @ViewChild(Content) content: Content;

    chord:Chord;
    positions:Array<Object> = [];
    hasScrolled:Boolean = false;

    constructor(public navCtrl:NavController, public params:NavParams, public config:ConfigProvider, public data:DataProvider, public popoverCtrl:PopoverController, public favorites:FavoritesProvider) {
        let chord:Object = params.get('chord');

        this.chord = this.data.getChord(chord['note'], chord['form']);
    }

    ionViewWillEnter() {
        this.generateList();
    }

    ionViewDidEnter() {
        console.log('=' + this.params.get('position'));
        if (this.params.get('position') && this.params.get('position') > 1) {
            console.log("OUI");
            this.scrollToElement('position_' + this.params.get('position'));
        }
    }

    generateList() {
        this.positions = [];

        this.chord.positions.forEach((position,index) => {
            this.positions.push({
                position:position,
                isFavorited:this.favorites.exists(this.toFavorite(index), 'chords')
            });
        });
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    favorite(index:number) {
        let favorite:Object = this.toFavorite(index);

        if (this.favorites.exists(favorite, 'chords')) {
            this.favorites.remove(favorite, 'chords');
        } else {
            this.favorites.add(favorite, 'chords');
        }

        this.generateList();
    }

    toFavorite(position:number):Object {
        let favorite:Object = {
            'letter':this.chord.note.letter['name'],
            'accidental':this.chord.note.accidental,
            'type':this.chord.form['type'],
            'quality':this.chord.form['quality'],
            'position':position
        };
        return favorite;
    }

    scrollToElement(id) { 
        let el = document.getElementById(id);
        if (el != undefined) {
            var rect = el.getBoundingClientRect();
            this.content.scrollTo(0, rect.top);
        }
    }
}
