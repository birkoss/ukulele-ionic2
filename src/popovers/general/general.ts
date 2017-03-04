import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';

@Component({
    selector: 'general-popover',
    templateUrl: 'general.html'
})

export class GeneralPopover {

    constructor(public viewCtrl:ViewController, public config:ConfigProvider) {
    }

    public onChanged() {
        this.config.save();
    }
}
