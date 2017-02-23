import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';
import { Type } from '../../classes/type';

@Component({
  selector: 'chords-quiz',
  templateUrl: 'chords-quiz.html'
})
export class ChordsQuizPage {
    current_note:Note;
    current_type:Type;

  constructor(public navCtrl: NavController, public config:ConfigProvider, public data:DataProvider) {
      this.current_note = data.getNote('A');
      this.current_type = this.data.getType('Major', 'Triad');
  }

}
