import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';
import { FavoritesProvider } from '../../providers/favorites-provider';
import { Data } from '../../providers/data';
import { Favorites } from '../../providers/favorites';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-card',
    templateUrl: 'note-card.html'
})

export class NoteCard {
    private noteName:string;
    private noteDirection:string;

    private _note:Note;

    private isFavorited:Boolean = false;
    
    isReady:Boolean = false;

	@Input('note')
    set note(note:string) {
        this.noteName = note;
    }

    @Input('direction')
    set direction(direction:string) {
        this.noteDirection = direction;
    }

	constructor(private dataProvider:DataProvider, private config:ConfigProvider, public favoritesService:Favorites, private dataService:Data) { }

    ngOnInit() {
        this.dataService.getNote(this.noteName, this.noteDirection).subscribe(note => {
            this.favoritesService.all().subscribe(favorites => {
                favorites.filter(favorite => {
                    if (favorite['name'] == note.name && favorite['direction'] == note.direction) {
                        this.isFavorited = true;
                    }
                });
            });
            this._note = note;
        });
    }

    public favorite():void {


        console.log('favorite()');
        let fav = {'note':this._note.name, 'direction':this._note.direction};
        this.favoritesService.add(fav);
        /*
        let fav = {'note':this._note.name, 'direction':this._note.direction};

        let index:number = this.favorites.getIndex(fav, 'notes');
        if (index == -1) {
            this.favorites.add(fav, 'notes');
        } else {
            this.favorites.remove(index, 'notes');
        }
        */
    }
}
