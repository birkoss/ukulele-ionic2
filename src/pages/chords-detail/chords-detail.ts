import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { DetailOptionsPopover } from '../../popovers/detail-options/detail-options';

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
    positions:Array<Position> = [];
    hasScrolled:Boolean = false;

    constructor(public navCtrl:NavController, public params:NavParams, public config:ConfigProvider, public data:DataProvider, public popoverCtrl:PopoverController, public favorites:FavoritesProvider) {
        let chord:Object = params.get('chord');

        this.chord = this.data.getChord(chord['note'], chord['form']);
    }

    ionViewDidEnter() {
        /*
        this.chord = this.data.getChord(this.note.name, this.type['name']);
        if (this.position > 0 && !this.hasScrolled) {
            this.scrollToElement('position_' + this.position);
        }
        */
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create(DetailOptionsPopover);
        popover.present({
            ev: event
        });
    }

    public favorite(index:number):void {
        //this.chord.positions[index].isFavorited = !this.chord.positions[index].isFavorited;

        //this.dataProvider.save();
    }

    scrollToElement(id) { 
        let el = document.getElementById(id);
        if (el != undefined) {
            var rect = el.getBoundingClientRect();
            this.content.scrollTo(0, rect.top);
        }
    }

    public getStrings():Array<any> {
        return [];
        //return this.chord.positions[0].strings;
    }
}
