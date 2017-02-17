import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ChordsFavoritesPage } from '../favorites/favorites';

import { DataProvider } from '../../../providers/data-provider';

import { Chord } from '../../../classes/chord';

@Component({
  selector: 'chords-list',
  templateUrl: 'list.html'
})
export class ChordsListPage {

    constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
        console.log(dataProvider.all());
    }

    public getChords() : Array<Chord> {
        return this.dataProvider.getChords();
    }
}
