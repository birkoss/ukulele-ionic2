import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from './detail';

import { ChordsFiltersPopover } from './popovers/chords-filters';
import { ChordsOptionsPopover } from './popovers/chords-options';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/Position';

@Component({
  selector: 'chords-list',
  templateUrl: 'list.html',
})
export class ChordsListPage {

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private dataProvider: DataProvider, private config: ConfigProvider) {
    }

    public getChords() : Array<Chord> {
        return this.dataProvider.getChords(this.config.ChordsFilters['list_chord_type']);
    }

    public getFirstPosition(chord:Chord) {
        return chord.positions[0];
    }

    public showPopup(event, type:string) {
        let popover = this.popoverCtrl.create((type == 'filters' ? ChordsFiltersPopover : ChordsOptionsPopover));
        popover.present({
            ev: event
        });
    }

    public showDetail(chord: Chord): void {
        this.navCtrl.push(ChordsDetailPage, {note: chord.note, type:chord.type});
    }
}
