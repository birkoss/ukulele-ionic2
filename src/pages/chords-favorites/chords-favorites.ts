import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ChordsDetailPage } from '../chords-detail/chords-detail';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { Chord } from '../../classes/chord';
import { Position } from '../../classes/Position';

@Component({
  selector: 'chords-favorites',
  templateUrl: 'chords-favorites.html'
})
export class ChordsFavoritesPage {

  constructor(public navCtrl: NavController, public dataProvider: DataProvider, private config: ConfigProvider, private favorites: FavoritesProvider) {
    
  }

  public showDetail(chord:Object): void {
      this.navCtrl.push(ChordsDetailPage, {note: chord['note'], type:chord['type'], 'position':chord['position']});
  }
}
