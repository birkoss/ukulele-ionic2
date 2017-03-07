import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { ChordsFiltersPopover } from '../../popovers/chords-filters/chords-filters';
import { GeneralPopover } from '../../popovers/general/general';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/Position';

@Component({
  selector: 'chords-list',
  templateUrl: 'chords-list.html',
})
export class ChordsListPage {
    chords:Array<Chord> = [];

    constructor(public navCtrl:NavController, public popoverCtrl:PopoverController, public data:DataProvider, public config:ConfigProvider) { }

    ionViewWillEnter() {
        this.generateList();
        console.log(this.chords);
    }

    public getFirstPosition(chord:Chord) {
        return chord.positions[0];
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    public showDetail(chord:Object): void {
        this.navCtrl.push(ChordsDetailPage, {note: chord['note'], type:chord['type']});
    }

    generateList() {
        this.chords = this.data.getChords();
    }
}
