import { Component } from '@angular/core';

import { ModalController, NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { ChordsFiltersModal } from '../../modals/chords-filters/chords-filters';
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

    constructor(public navCtrl:NavController, public popoverCtrl:PopoverController, public data:DataProvider, public config:ConfigProvider, public modalCtrl:ModalController) { }

    ionViewWillEnter() {
        this.generateList();
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }

    showDetail(chord:Object) {
        this.navCtrl.push(ChordsDetailPage, {chord: chord['chord']});
    }

    generateList() {
        this.chords = [];

        this.data.getChords().forEach(chord => {
            if (this.config.isEmpty(this.config.chords['list_forms']) || this.config.chords['list_forms'][chord.form['type']+'-'+chord.form['quality']]) {
                if (this.config.isEmpty(this.config.chords['list_notes']) || this.config.chords['list_notes'][chord.note.toString()]) {
                    this.chords.push({
                        note: chord.note,
                        form: chord.form,
                        position: chord.positions[0],
                        positionIndex: 0
                    });
                }
            }
        });
    }

    showModal(event) {
        let modal = this.modalCtrl.create(ChordsFiltersModal, {'parent':this});
        modal.present();
    }
}
