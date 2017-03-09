import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { ChordsDetailPopover } from '../../popovers/chords-detail/chords-detail';

import { Chord } from '../../classes/chord';
import { Note } from '../../classes/note';
import { ScaleBuilder } from '../../classes/scale-builder';

@Component({
    selector: "chords-detail",
    templateUrl: "chords-detail.html",
})

export class ChordsDetailPage {
    @ViewChild(Content) content: Content;

    chord:Chord;
    positions:Array<Object> = [];
    hasScrolled:Boolean = false;
    scale:Array<Note> = [];
    scale_parts:Array<number> = [];

    constructor(public navCtrl:NavController, public params:NavParams, public config:ConfigProvider, public data:DataProvider, public popoverCtrl:PopoverController, public favorites:FavoritesProvider) {
        let chord:Object = params.get('chord');

        this.chord = this.data.getChord(chord['note'], chord['form']);
    }

    ionViewWillEnter() {
        this.generateList();

        let scale:Object = this.data.getScale(this.chord.form['scale']);
        this.scale_parts = this.chord.form['scale_parts'];
        let builder:ScaleBuilder = new ScaleBuilder();
        builder.set(this.data.getLetters());
        builder.select(this.chord.note.letter['name'], this.chord.note.accidental);
        builder.create(scale['steps']);
        this.scale = builder.getScale();
    }

    ionViewDidEnter() {
        if (this.params.get('position') && this.params.get('position') > 1) {
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
        let popover = this.popoverCtrl.create(ChordsDetailPopover);
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
