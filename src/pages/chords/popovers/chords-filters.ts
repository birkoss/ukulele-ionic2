import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from '../../../providers/config-provider';
import { DataProvider } from '../../../providers/data-provider';

@Component({
    templateUrl: 'chords-filters.html'
})

export class ChordsFiltersPopover {

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider) {
    }

    close() {
        this.viewCtrl.dismiss();
    }

    public onFilterChanged(): void {
        this.config.save();
    }
}
