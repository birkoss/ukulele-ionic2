import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    template: ` 
    <ion-list>
        <ion-item>
            <ion-label>Montrer les noms de corde</ion-label>
            <ion-toggle [(ngModel)]="config.ChordsOptions.show_strings_name" (ionChange)="onOptionChanged()"></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-label>Montrer les notes</ion-label>
            <ion-toggle [(ngModel)]="config.ChordsOptions.show_notes" (ionChange)="onOptionChanged()"></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-label>Montrer les positions</ion-label>
            <ion-toggle [(ngModel)]="config.ChordsOptions.show_frets" (ionChange)="onOptionChanged()"></ion-toggle>
        </ion-item>
        <ion-item>
            <ion-label>Voir les noms en français</ion-label>
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
