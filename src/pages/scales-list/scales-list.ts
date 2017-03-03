import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { ChordsFiltersPopover } from '../../popovers/chords-filters/chords-filters';
import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/Position';
import { ScaleBuilder } from '../../classes/scale-builder';

@Component({
  selector: 'scales-list',
  templateUrl: 'scales-list.html',
})
export class ScalesListPage {
    scales:Array<Object> = [];

    constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private dataProvider: DataProvider, private config: ConfigProvider) { }

    ionViewDidEnter() {

        this.dataProvider.getScales().forEach(scale => {
            scale['scales'] = [];
            if (scale['name'] == "Chromatic") {


                    let builder:ScaleBuilder = new ScaleBuilder();
                    builder.set(this.dataProvider.getLetters());
                    builder.select("C");

                    builder.create(scale['steps']);
                    console.log(scale['steps']);

                    scale['scales'].push({'name':'Ascendent', 'notes': builder.getScale()});
                    console.log(builder.getScale());

                let notes:Array<string> = [];
                /*
                this.dataProvider.getNotes().forEach(note => {
                    notes.push(note.name);
                    if (note['step']['up'] == 1) {
                        notes.push(note.name + "#");
                    }
                });
                scale['scales'].push({'name':'Ascendent', 'notes': notes});

                notes = [];
                this.dataProvider.getNotes().reverse().forEach(note => {
                    notes.push(note.name);
                    if (note['step']['down'] == 1) {
                        notes.push(note.name + "b");
                    }
                });
                scale['scales'].push({'name':'Descendent', 'notes': notes});
                */
            } else {

                this.dataProvider.getNotes().forEach(note => {
                    let builder:ScaleBuilder = new ScaleBuilder();
                    builder.set(this.dataProvider.getLetters());
                    builder.select(note.letter['name'], note.accidental);
                    builder.create(scale['steps']);

                    scale['scales'].push({'name':note, 'notes':builder.getScale()});
                });
            }
            this.scales.push(scale);
        });
    }
}
