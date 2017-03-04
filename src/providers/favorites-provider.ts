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
                console.log(data);
                this.favorites = Object.assign(this.favorites, JSON.parse(data));
            }
            Promise.resolve(true);
        });
    }

    /* Public */

    public all(type:string = "chords"):Array<Object> {
        return this.favorites[type];
    }

    public save(favorites:Object):void {
        this.favorites = favorites;
        this.storage.set('favorites', JSON.stringify(this.favorites));
    }

    public add(favorite:Object, type:string = "chords"): void {
        if (!this.exists(favorite, type)) {
            this.favorites[type].push(favorite);
            //this.save();
        }
    }

    public getIndex(favorite:Object, type:string = "chords"): number {
        for (let i:number=0; i<this.favorites[type].length; i++) {
            // @todo: Better object comparaison
            if (JSON.stringify(this.favorites[type][i]) == JSON.stringify(favorite)) {
                return i;
            }
        }
        return -1;
    }

    public exists(favorite:Object, type:string = "chords"): Boolean {
        return (this.getIndex(favorite, type) >= 0);
    }

    public remove(index:number, type:string = "chords"): void {
        this.favorites[type].splice(index, 1);
        //this.save();
    }

}
