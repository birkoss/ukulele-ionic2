import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    templateUrl: 'chords-quiz.html'
})

export class ChordsQuizModal {

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider) {
    }

    public close():void {
        this.viewCtrl.dismiss();
    }

    public onFilterChanged():void {
        this.config.save();
    }
}
