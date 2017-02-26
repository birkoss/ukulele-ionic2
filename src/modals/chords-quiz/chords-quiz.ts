import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { FavoritesProvider } from '../../providers/favorites-provider';
import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    selector: 'chords-quiz-modal',
    templateUrl: 'chords-quiz.html'
})

export class ChordsQuizModal {

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider, public favorites:FavoritesProvider) {
    }

    public close():void {
        this.viewCtrl.dismiss();
    }

    public onFilterChanged():void {
        this.config.save();
    }
}
