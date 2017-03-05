import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { ConfigProvider } from '../providers/config-provider';

@Injectable()
export class FavoritesProvider {
    favorites:Object;

    constructor(public storage:Storage, public config:ConfigProvider) { }

    public load() {
        console.log('FP.load...');
        if (this.favorites) {
            return Promise.resolve(this.favorites);
        }

        console.log('FP.loading...');
        return this.storage.get('favorites').then(data => {
            this.favorites = {'chords':[], 'notes':[]};
            if (data != null) {
                console.log('FP.loaded...');
                this.favorites = Object.assign(this.favorites, JSON.parse(data));
                console.log(this.favorites);
            }
            Promise.resolve(true);
        });
    }

    /* Public */

    public all(type:string = "chords"):Array<Object> {
        return this.favorites[type];
    }

    /* @TODO remove the unused param */
    public save(favorites:Object = null) {
        this.storage.set('favorites', JSON.stringify(this.favorites));
    }

    public add(favorite:Object, type:string = "chords") {
        if (!this.exists(favorite, type)) {
            this.favorites[type].push(favorite);
            console.log(this.favorites);
            this.save();
        }
    }

    public getIndex(favorite:Object, type:string = "chords"):number {
        for (let i:number=0; i<this.favorites[type].length; i++) {
            // @todo: Better object comparaison
            if (JSON.stringify(this.favorites[type][i]) == JSON.stringify(favorite)) {
                return i;
            }
        }
        return -1;
    }

    public exists(favorite:Object, type:string = "chords"):Boolean {
        return (this.getIndex(favorite, type) >= 0);
    }

    public remove(favorite:Object, type:string = "chords") {
        let index:number = this.getIndex(favorite, type);
        if (index >= 0) {
            this.removeAt(index, type);
        }
    }

    public removeAt(index:number, type:string = "chords") {
        this.favorites[type].splice(index, 1);
        this.save();
    }

}
