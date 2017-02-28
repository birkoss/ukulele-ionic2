import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-card',
    templateUrl: 'note-card.html'
})

export class NoteCard {
    private _note: Note;
    private _favorited:Boolean;
    
    isReady:Boolean = false;

	@Input('note')
    set note(note: Note) {
        this._note = note;
    }

    @Input('favorited')
    set favorited(favorited: Boolean) {
        this._favorited = favorited;
    }

	constructor(private dataProvider:DataProvider, private config:ConfigProvider, public favorites:FavoritesProvider) { }

    ngOnInit() {
        this.favorites.load().then(data => {
            this.isReady = true;
        });
    }

    public favorite():void {
        let fav = {'name':this._note.name, 'direction':this._note.direction};

        let index:number = this.favorites.getIndex(fav, 'notes');
        if (index == -1) {
            this.favorites.add(fav, 'notes');
        } else {
            this.favorites.remove(index, 'notes');
        }
    }

    public isFavorited():Boolean {
        return this.favorites.exists({'name':this._note.name, 'direction':this._note.direction}, 'notes');
    }
}
