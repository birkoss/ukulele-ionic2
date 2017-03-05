import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, PopoverController, Content } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { GeneralPopover } from '../../popovers/general/general';

import { Chord } from '../../classes/chord';
import { Note } from '../../classes/note';
import { Type } from '../../classes/type';

@Component({
    selector: "notes-detail",
    templateUrl: "notes-detail.html",
})

export class NotesDetailPage {
    @ViewChild(Content) content: Content;

    note: Note;
    hasScrolled:Boolean = false;

    clefs:Array<Note> = [];
    currentClef:string = "F";

    positions:Array<number> = [1, 2];

    constructor(public navCtrl:NavController, public navParams:NavParams, public config:ConfigProvider, public data:DataProvider, public popoverCtrl:PopoverController, public favorites:FavoritesProvider) {
        this.note = navParams.get('note');
    }

    ionViewDidEnter() {
        this.clefs = [];
        this.clefs.push(this.data.getNote("G"));
        this.clefs.push(this.data.getNote("C"));
        this.clefs.push(this.data.getNote("F"));
        this.currentClef = "G";
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create(GeneralPopover);
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

    onFilterChanged(element) {
        console.log('OnFilerChanged...');
        this.currentClef = element.value;
    }
}
