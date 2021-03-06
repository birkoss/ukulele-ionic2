import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { GeneralPopover } from '../../popovers/general/general';

import { Note } from '../../classes/note';

@Component({
    selector: "notes-detail",
    templateUrl: "notes-detail.html",
})

export class NotesDetailPage {
    @ViewChild(Content) content: Content;

    note: Note;
    hasScrolled:Boolean = false;

    clefs:Array<Note> = [];
    currentClef:string = "";

    positions:Array<Object>;

    constructor(public navCtrl:NavController, public params:NavParams, public config:ConfigProvider, public data:DataProvider, public popoverCtrl:PopoverController, public favorites:FavoritesProvider) {
        this.note = params.get('note');
    }

    ionViewWillEnter() {
        this.clefs = this.data.getClefs();
        this.currentClef = this.config.notes['list_clef'];
        if (this.params.get('clef')) {
            this.currentClef = this.params.get('clef');
        }
        this.generateList();
    }
    ionViewDidEnter() {
        if (this.params.get('position') && this.params.get('position') > 1) {
            this.scrollToElement('position_' + this.params.get('position'));
        }
    }

    generateList() {
        this.positions = [];
        for (let i=1; i<=2; i++) {
            this.positions.push({
                'position':i,
                'isFavorited':this.favorites.exists(this.toFavorite(i), 'notes')
            });
        }
    }

    public showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    favorite(position:number) {
        if (this.favorites.exists(this.toFavorite(position), 'notes')) {
            this.favorites.remove(this.toFavorite(position), 'notes');
        } else {
            this.favorites.add(this.toFavorite(position), 'notes');
        }

        this.generateList();
    }

    toFavorite(position:number):Object {
        let favorite:Object = {
            'letter':this.note.letter['name'],
            'accidental':this.note.accidental,
            'clef':this.currentClef,
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

    onFilterChanged(element) {
        this.currentClef = element.value;
        this.generateList();
    }
}
