import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
    configs: Object = {};

    constructor(public storage: Storage) { }

    /* Private */

    public load() {
        console.log('ConfigProvider.init()');
        this.configs['chords'] = {};
        this.configs['chords']['filters'] = {'list_chord_type':'Major', 'quiz_chord_types':{}, 'quiz_use_favorites':true, 'quiz_use_flat':false, 'quiz_use_sharp':false};
        this.configs['chords']['options'] = {'show_note_in_french': true, 'show_strings_name': false, 'show_notes': false, 'show_frets': false};
        this.configs['notes'] = {};
        this.configs['notes']['filters'] = {'list_use_flat':false, 'list_use_sharp':false, 'quiz_use_favorites':true, 'quiz_use_flat':false, 'quiz_use_sharp':false};

        return this.storage.get('config').then(data => {
            if (data != null) {
                console.log('ConfigProvider.init() - loaded...');
                this.configs = this.merge(this.configs, JSON.parse(data));
            }
        });
    }

    /* Public */

    public save(): void {
        console.log('ConfigProvider.save()');
        this.storage.set('config', JSON.stringify(this.configs));
    }

    /* Getter/Setter */

    public get ChordsFilters(): Object {
        return this.configs['chords']['filters'];
    }

    public get ChordsOptions(): Object {
        return this.configs['chords']['options'];
    }

    public get NotesFilters(): Object {
        return this.configs['notes']['filters'];
    }

    public merge(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if ( obj2[p].constructor==Object ) {
                    obj1[p] = this.merge(obj1[p], obj2[p]);

                } else {
                    obj1[p] = obj2[p];

                }

            } catch(e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];

            }
        }

        return obj1;
    }
}

