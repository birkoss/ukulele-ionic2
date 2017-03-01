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

	@Input('note') set note(note:string) { this.noteName = note; }
    @Input('direction') set direction(direction:string) { this.noteDirection = direction; }

	constructor(private dataProvider:DataProvider, private config:ConfigProvider) { }

    ngOnInit() {
        this._note = this.dataProvider.getNote(this.noteName, this.noteDirection);
    }

    public favorite():void {
        this._note.isFavorited = !this._note.isFavorited;
        this.dataProvider.save();
    }
}
