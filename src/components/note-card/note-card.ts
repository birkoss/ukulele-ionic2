import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-card',
    templateUrl: 'note-card.html'
})

export class NoteCard {
    private _note: Note;

	@Input('note')
    set note(note: Note) {
        this._note = note;
    }

	constructor(private dataProvider: DataProvider, private config: ConfigProvider) { }
}
