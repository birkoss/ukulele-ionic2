import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class ConfigProvider {
    private configs: Object = {};

    constructor(public storage: Storage) { }

    load() {
        this.configs['general'] = {'letter_in_french':false, 'language':'en', 'sway':'pinpin'};

        this.configs['chords'] = {'list_forms':{}, 'list_notes':{}, 'quiz_forms':{}, 'quiz_favorites':false, 'quiz_sharp':false, 'quiz_flat':false, 'detail_strings':true, 'detail_notes':true, 'detail_scale':true};
    
        this.configs['notes'] = {'list_flat':false, 'list_sharp':false, 'list_high_note':true, 'list_clef':"G", 'quiz_sharp':false, 'quiz_flat':false, 'quiz_favorites':false, 'quiz_clefs':{}};

        this.configs['scales'] = {'list_notes':{}, 'list_scales':{}};

        return this.storage.get('config').then(data => {
            if (data != null) {
                /* Merge loaded configs over default configs */
                let loadedConfig:Object = JSON.parse(data);
                for (let key in loadedConfig) {
                    this.configs[key] = Object.assign(this.configs[key], loadedConfig[key]);
                }
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
