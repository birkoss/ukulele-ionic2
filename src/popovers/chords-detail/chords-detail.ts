import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';

@Component({
    selector: 'chords-detail-popover',
    templateUrl: 'chords-detail.html'
})

export class ChordsDetailPopover {

    constructor(public viewCtrl:ViewController, public config:ConfigProvider) { }

    public onChanged() {
        this.config.save();
    }
}
