import { Component, Input } from '@angular/core';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-name',
    template: '{{name}}'
})
export class NoteName {
    private name:string;
    private _note:Note;
    private inFrench:Boolean;

    @Input()
    set note(note: Note) {
        this._note = note;
        this.updateName();
    }

    @Input()
    set french(inFrench: Boolean) {
        this.inFrench = inFrench;
        this.updateName();
    }

    constructor() { }

    private updateName() {
        this.name = this._note.toString(this.inFrench);
    }
}
