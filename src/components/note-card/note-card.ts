import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-card',
    templateUrl: 'note-card.html'
})

export class NoteCard {
    private noteName:string;
    private noteDirection:string;

    private _note:Note;

	@Input('note')
    set note(note:Note) {
        this._note = note;
    }
    @Input('direction') set direction(direction:string) { this.noteDirection = direction; }

    @Output('onItemChanged') onItemChanged:EventEmitter<Boolean> = new EventEmitter<Boolean>();

	constructor(private dataProvider:DataProvider, private config:ConfigProvider) { }

    ngOnInit() {
    }

    public favorite():void {
        this._note.isFavorited = !this._note.isFavorited;
        this.dataProvider.save();
        this.onItemChanged.emit(true);
    }
}
