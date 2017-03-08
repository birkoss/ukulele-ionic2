import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TranslateService } from 'ng2-translate';

import { DataProvider } from '../../providers/data-provider';
import { ConfigProvider } from '../../providers/config-provider';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
    languages:Array<Object> = [
        {'name':'English', 'suffix':'en'},
        {'name':'Français', 'suffix':'fr'}
    ];

    constructor(public navCtrl:NavController, private data:DataProvider, private config:ConfigProvider, public translate:TranslateService) { }

    public onChanged(type:string = '') {
        this.config.save();

        if (type == 'language') {
            this.translate.use(this.config.general['language']);
        }
    }
}
