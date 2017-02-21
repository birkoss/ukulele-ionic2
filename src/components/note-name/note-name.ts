import { Component, Input } from '@angular/core';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-name',
    template: '{{_name}}'
})
export class NoteName {
    private _name:string;
    private _note:Note;
    private _french:Boolean;

    @Input()
    set note(note: Note) {
        this._note = note;
        this._name = this._note.name;
    }

    @Input()
    set french(french: Boolean) {
        this._french = french;
        this._name = (this._french ? this._note.french : this._note.name);
    }

    constructor() { }
}
