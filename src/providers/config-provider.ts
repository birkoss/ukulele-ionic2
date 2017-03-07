import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
    private configs: Object = {};

    constructor(public storage: Storage) { }

    load() {
        this.configs['general'] = {'letter_in_french':false};

        this.configs['chords'] = {'list_forms':{}, 'list_notes':{}, 'quiz_forms':{}, 'quiz_favorites':false, 'quiz_sharp':false, 'quiz_flat':false};
    
        this.configs['notes'] = {'list_flat':false, 'list_sharp':false, 'list_high_note':true, 'list_clef':"G", 'quiz_sharp':false, 'quiz_flat':false, 'quiz_favorites':false, 'quiz_clefs':{}};

        this.configs['scales'] = {'list_notes':{}, 'list_scales':{}};

        return this.storage.get('config').then(data => {
            if (data != null) {
                this.configs = Object.assign(this.configs, JSON.parse(data));
            }
        });
    }

    save() {
        this.storage.set('config', JSON.stringify(this.configs));
    }

    isEmpty(options:Object):Boolean {
        let isEmpty:Boolean = true;

        Object.keys(options).forEach(key => {
            if (options[key]) {
                isEmpty = false;
            }
        });

        return isEmpty;
    }

    /* Getter/Setter */

    get general():Object { return this.configs['general']; }

    get scales():Object { return this.configs['scales']; }

    get notes():Object { return this.configs['notes']; }

    get chords():Object { return this.configs['chords']; }
}
