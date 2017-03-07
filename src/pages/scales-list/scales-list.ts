import { Component } from '@angular/core';

import { ModalController, NavController, PopoverController } from 'ionic-angular';

import { GeneralPopover } from '../../popovers/general/general';

import { ScalesFiltersModal } from '../../modals/scales-filters/scales-filters';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

import { ScaleBuilder } from '../../classes/scale-builder';

@Component({
  selector: 'scales-list',
  templateUrl: 'scales-list.html',
})
export class ScalesListPage {
    scales:Array<Object> = [];

    constructor(public navCtrl:NavController, public popoverCtrl:PopoverController, private data:DataProvider, private config:ConfigProvider, public modalCtrl:ModalController) { }

    ionViewDidEnter() {
        this.generateList();
    }

    generateList() {
        this.scales = [];

        this.data.getScales().forEach(scale => {
            if (this.config.isEmpty(this.config.scales['list_scales']) || this.config.scales['list_scales'][scale['name']]) {
                scale['scales'] = [];

                this.data.getNotes().forEach(note => {
                    if (this.config.isEmpty(this.config.scales['list_notes']) || this.config.scales['list_notes'][note.toString()]) {
                        let builder:ScaleBuilder = new ScaleBuilder();
                        builder.set(this.data.getLetters());
                        builder.select(note.letter['name'], note.accidental);
                        builder.create(scale['steps'], scale['unique']);

                        scale['scales'].push({'note':note, 'notes':builder.getScale()});
                    }
                });

                this.scales.push(scale);
            }
        });
    }

    showModal(event) {
        let modal = this.modalCtrl.create(ScalesFiltersModal, {'parent':this});
        modal.present();
    }

    showPopup(event) {
        let popover = this.popoverCtrl.create(GeneralPopover);
        popover.present({
            ev: event
        });
    }
}
