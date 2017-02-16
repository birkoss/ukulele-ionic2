import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ChordsFavoritesPage } from '../favorites/favorites';

@Component({
  selector: 'chords-list',
  templateUrl: 'list.html'
})
export class ChordsListPage {

  constructor(public navCtrl: NavController) {
    
  }

  showLink() {
    this.navCtrl.push(ChordsFavoritesPage);
  }

}
