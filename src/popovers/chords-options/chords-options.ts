import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    templateUrl: 'chords-options.html'
})

export class ChordsOptionsPopover {

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider) {
    }

    close() {
        this.viewCtrl.dismiss();
    }

    public onOptionChanged(): void {
        this.config.save();
    }
}
