import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class Favorites {
    private data:Array<Object>;

    constructor(public http:Http, public storage:Storage) { }

    all():Observable<Array<Object>> {
        return new Observable(observer => {
            if (this.data != undefined) {
                observer.next(this.data);
            }

            //this.storage.set('favorites_test', [{'title':'abc'}, {'title':'def'}]);
            this.storage.get('favorites_test').then(data => {
                if (data != null) {
                    this.data = data;
                    observer.next(this.data);
                }
            });
        });
    }

    add(favorite:Object) {
        return new Observable(observer => {
            this.data.push(favorite);

            observer.next(Object.assign({}, this.data));
        });
    }

}
