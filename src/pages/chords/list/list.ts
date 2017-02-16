import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MusicalNote } from '../../../components/musical-note/musical-note';

@Component({
  selector: 'chords-list',
  templateUrl: 'list.html'
})
export class ChordsListPage {

  constructor(public navCtrl: NavController) {
    
  }

}
