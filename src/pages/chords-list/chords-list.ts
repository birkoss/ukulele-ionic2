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
    chords:Array<Object> = [];

    constructor(public navCtrl:NavController, public popoverCtrl:PopoverController, public data:DataProvider, public config:ConfigProvider) { }

    ionViewWillEnter() {
        this.generateList();
        console.log(this.chords);
    }

    getFirstPosition(chord:Chord) {
        return chord.positions[0];
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    showDetail(chord:Object): void {
        this.navCtrl.push(ChordsDetailPage, {chord: chord['chord']});
    }

    generateList() {
        this.data.getChords().forEach(chord => {
            this.chords.push({
                note: chord.note,
                form: chord.form,
                position: chord.positions[0]
            });
        });
    }
}
