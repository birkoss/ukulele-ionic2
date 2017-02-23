import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    template: ` 
    <ion-list>
        <ion-item>
            <ion-label>Show strings name</ion-label>
            <ion-toggle [(ngModel)]="config.ChordsOptions.show_strings_name" (ionChange)="onOptionChanged()"></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-label>Show notes</ion-label>
            <ion-toggle [(ngModel)]="config.ChordsOptions.show_notes" (ionChange)="onOptionChanged()"></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-label>Show frets</ion-label>
            <ion-toggle [(ngModel)]="config.ChordsOptions.show_frets" (ionChange)="onOptionChanged()"></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-label>Show French name</ion-label>
            <ion-toggle [(ngModel)]="config.ChordsOptions.show_note_in_french" (ionChange)="onOptionChanged()"></ion-toggle>
        </ion-item>
    </ion-list>
`
})

export class DetailOptionsPopover {

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider) {
    }

    close() {
        this.viewCtrl.dismiss();
    }

    public onOptionChanged(): void {
        this.config.save();
    }
}
