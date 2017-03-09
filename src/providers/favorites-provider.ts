import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { ConfigProvider } from '../providers/config-provider';

@Injectable()
export class FavoritesProvider {
    favorites:Object;

    constructor(public storage:Storage, public config:ConfigProvider) { }

    load() {
        if (this.favorites) {
            return Promise.resolve(this.favorites);
        }

        return this.storage.get('favorites').then(data => {
            this.favorites = {'chords':[], 'notes':[]};
            if (data != null) {
                this.favorites = Object.assign(this.favorites, JSON.parse(data));
            }
            Promise.resolve(true);
        });
    }

    all(type:string = "chords"):Array<Object> {
        return this.favorites[type];
    }

    save() {
        this.storage.set('favorites', JSON.stringify(this.favorites));
    }

    add(favorite:Object, type:string = "chords") {
        if (!this.exists(favorite, type)) {
            this.favorites[type].push(favorite);
            this.save();
        }
    }

    getIndex(favorite:Object, type:string = "chords"):number {
        for (let i:number=0; i<this.favorites[type].length; i++) {
            if (JSON.stringify(this.favorites[type][i]) == JSON.stringify(favorite)) {
                return i;
            }
        }
        return -1;
    }

    exists(favorite:Object, type:string = "chords"):Boolean {
        return (this.getIndex(favorite, type) >= 0);
    }

    remove(favorite:Object, type:string = "chords") {
        let index:number = this.getIndex(favorite, type);
        if (index >= 0) {
            this.removeAt(index, type);
        }
    }

    removeAt(index:number, type:string = "chords") {
        this.favorites[type].splice(index, 1);
        this.save();
    }
}
