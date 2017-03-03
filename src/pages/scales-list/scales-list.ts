import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { ChordsFiltersPopover } from '../../popovers/chords-filters/chords-filters';
import { ChordsOptionsPopover } from '../../popovers/chords-options/chords-options';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/Position';
import { NotesBrowser } from '../../classes/notes';

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
                /*
                    let browser:NotesBrowser = new NotesBrowser();
                    browser.set(this.dataProvider.getNotes());
                    browser.select("D");

                    browser.apply(scale['steps']);
                    */

                this.dataProvider.getNotes().forEach(note => {
                    let browser:NotesBrowser = new NotesBrowser();
                    browser.set(this.dataProvider.getNotes());
                    browser.select(note.name);

                    browser.apply(scale['steps']);
                    /*
                    let notes:Array<Object> = [];
                    let ready:Boolean = false;
                    this.scales[0]['scales'][0]['notes'].concat(this.scales[0]['scales'][0]['notes']).forEach(scale_note => {
                        if (scale_note.name == note.name && !ready) {
                            ready = true;
                            notes.push(note.name);
                            scale['steps'].forEach(step => {
                            });
                        }
                    });
                    */
                    scale['scales'].push({'name':note.name, 'notes':browser.getScale()});
                });
            }
            this.scales.push(scale);
        });
    }
}
