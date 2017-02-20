import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ConfigProvider } from '../../../providers/config-provider';
import { DataProvider } from '../../../providers/data-provider';
import { FavoritesProvider } from '../../../providers/favorites-provider';

import { Chord } from '../../../classes/chord';
import { Position } from '../../../classes/Position';

@Component({
  selector: 'chords-favorites',
  templateUrl: 'favorites.html'
})
export class ChordsFavoritesPage {

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, private config: ConfigProvider, private favorites: FavoritesProvider) {
    
  }

}
