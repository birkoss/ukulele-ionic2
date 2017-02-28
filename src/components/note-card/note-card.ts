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
    private noteName:string;
    private noteDirection:string;

    private _note:Note;
    
    isReady:Boolean = false;

	@Input('note')
    set note(note:string) {
        this.noteName = note;
    }

    @Input('direction')
    set direction(direction:string) {
        this.noteDirection = direction;
    }

	constructor(private dataProvider:DataProvider, private config:ConfigProvider, public favorites:FavoritesProvider) { }

    ngOnInit() {
        this.favorites.load().then(data => {
            this._note = this.dataProvider.getNote(this.noteName, this.noteDirection);
            this.isReady = true;
        });
    }

    public favorite():void {
        let fav = {'note':this._note.name, 'direction':this._note.direction};

        let index:number = this.favorites.getIndex(fav, 'notes');
        if (index == -1) {
            this.favorites.add(fav, 'notes');
        } else {
            this.favorites.remove(index, 'notes');
        }
    }

    public isFavorited():Boolean {
        return this.favorites.exists({'note':this._note.name, 'direction':this._note.direction}, 'notes');
    }
}
