import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
    configs: Object = {};

    constructor(public storage: Storage) { }

    /* Private */

    public load() {
        console.log('ConfigProvider.init()');
        this.configs['general'] = {'letter_in_french':false};

        this.configs['chords'] = {};
        this.configs['chords']['filters'] = {'list_chord_type':'Major', 'quiz_chord_types':{}, 'quiz_use_favorites':true, 'quiz_use_flat':false, 'quiz_use_sharp':false};
        this.configs['chords']['options'] = {'show_note_in_french': true, 'show_strings_name': false, 'show_notes': false, 'show_frets': false};
        this.configs['notes'] = {'list_flat':false, 'list_sharp':false, 'list_high_note':true};

        this.configs['scales'] = {'list_notes':{}, 'list_scales':{}};

        return this.storage.get('config').then(data => {
            if (data != null) {
                console.log(this.configs);
                console.log(data);
                this.configs = Object.assign(this.configs, JSON.parse(data));
            }
        });
    }

    /* Public */

    public save(): void {
        console.log('ConfigProvider.save()');
        this.storage.set('config', JSON.stringify(this.configs));
    }

    /* Getter/Setter */

    public get general():Object {
        return this.configs['general'];
    }

    public get scales():Object {
        return this.configs['scales'];
    }

    public get notes():Object {
        return this.configs['notes'];
    }













    public get ChordsFilters(): Object {
        return this.configs['chords']['filters'];
    }

    public get ChordsOptions(): Object {
        return this.configs['chords']['options'];
    }

    public get NotesFilters(): Object {
        return this.configs['notes']['filters'];
    }

    public isEmpty(options:Object):Boolean {
        let isEmpty:Boolean = true;

        Object.keys(options).forEach(key => {
            if (options[key]) {
                isEmpty = false;
            }
        });

        return isEmpty;
    }
}

