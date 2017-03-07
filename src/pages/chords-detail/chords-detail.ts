import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { DetailOptionsPopover } from '../../popovers/detail-options/detail-options';

import { Chord } from '../../classes/chord';
import { Note } from '../../classes/note';

@Component({
    selector: "chords-detail",
    templateUrl: "chords-detail.html",
})

export class ChordsDetailPage {
    @ViewChild(Content) content: Content;

    note: Note;
    type:Object;
    position: number = 0;
    chord: Chord;
    hasScrolled:Boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public dataProvider: DataProvider, public popoverCtrl: PopoverController, public favorites:FavoritesProvider) {
        this.note = navParams.get('note');
        this.type = navParams.get('type');

        if (navParams.get('position') != undefined) {
            this.position = navParams.get('position');
        }

    }

    ionViewDidEnter() {
        this.chord = this.dataProvider.getChord(this.note.name, this.type['name']);
        if (this.position > 0 && !this.hasScrolled) {
            this.scrollToElement('position_' + this.position);
        }
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create(DetailOptionsPopover);
        popover.present({
            ev: event
        });
    }

    public favorite(index:number):void {
        //this.chord.positions[index].isFavorited = !this.chord.positions[index].isFavorited;

        this.dataProvider.save();
    }

    scrollToElement(id) { 
        let el = document.getElementById(id);
        if (el != undefined) {
            var rect = el.getBoundingClientRect();
            this.content.scrollTo(0, rect.top);
        }
    }

    public getStrings():Array<any> {
        return this.chord.positions[0].strings;
    }
}
