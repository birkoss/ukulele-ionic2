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
    }

    @Input()
    set french(inFrench: Boolean) {
        this.inFrench = inFrench;
    }

    @Input('suffix') suffix:string = "";

    constructor() { }

    ngDoCheck() {
        this.updateName();
    }
    private updateName() {
        this.name = this._note.toString(this.suffix, this.inFrench);
    }
}
