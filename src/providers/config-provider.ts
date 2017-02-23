import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
    configs: Object = {};

    constructor(public storage: Storage) {
        console.log('ConfigProvider()');

        this.init();
    }

    /* Private */

    private init(): void {
        this.configs['chords'] = {};
        this.configs['chords']['filters'] = {'list_chord_type': 'Major'};
        this.configs['chords']['options'] = {'show_note_in_french': true, 'show_strings_name': false, 'show_notes': false, 'show_frets': false};

        console.log('init...');

        console.log(this.configs);
        this.storage.get('config').then(data => {
            if (data != null) {
                this.configs = JSON.parse(data);
            }
        });
    }

    /* Public */

    public save(): void {
        console.log('saving config...');
        this.storage.set('config', JSON.stringify(this.configs));
    }

    /* Getter/Setter */

    public get ChordsFilters(): Object {
        return this.configs['chords']['filters'];
    }

    public get ChordsOptions(): Object {
        return this.configs['chords']['options'];
    }
}

