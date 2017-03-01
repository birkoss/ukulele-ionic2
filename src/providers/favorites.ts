import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable()
export class Favorites {
    private data:Array<Object>;

    constructor(public storage:Storage) { }

    public load():Promise<Boolean> {
        return this.storage.get('favorites').then(data => {
            this.data = data;
            return Promise.resolve(true);
        });
    }

    all(type:string):Array<Object> {
        return this.data[type];
    }

    /*
    add(favorite:Object, type:string) {
        return new Observable(observer => {
            this.data[type].push(favorite);

            this.storage.set('favorites', this.data);

            observer.next(Object.assign({}, this.data));
        });
    }
    */

}
