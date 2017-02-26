import { Component } from '@angular/core';

import { ViewController, ToastController } from 'ionic-angular';

import { FavoritesProvider } from '../../providers/favorites-provider';
import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    selector: 'chords-quiz-modal',
    templateUrl: 'chords-quiz.html'
})

export class ChordsQuizModal {

    constructor(public viewCtrl: ViewController, private data: DataProvider, private config: ConfigProvider, public favorites:FavoritesProvider, public toastCtrl:ToastController) {
    }

    public close():void {
        this.viewCtrl.dismiss();
    }

    public onFilterChanged(element, element_value):void {
        let atLeastOne:Boolean = false;
        for (let key in this.config.ChordsFilters['quiz_chord_types']) {
            if (this.config.ChordsFilters['quiz_chord_types'][key]) {
                atLeastOne = true;
                break;
            }
        }
        if (!atLeastOne) {
            this.config.ChordsFilters['quiz_chord_types']['Major'] = true;

            if (!element.checked) {
                let toast = this.toastCtrl.create({
                    message: 'Il doit y avoir au moins un type!',
                    position: 'top',
                    duration: 3000
                });
                toast.present();
            }
            if (element_value == 'Major') {
                element.checked = true;
            }
        }

        this.config.save();
    }
}
