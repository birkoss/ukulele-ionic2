import { Component, Input } from '@angular/core';

import { Note } from '../../classes/note';

@Component({
    selector: 'chord-name',
    template: '<note-name [note]="note" [french]="french"></note-name>{{_name}}'
})
export class ChordName {
    private _name:string = "";

    @Input() note: Note;
    @Input() french: Boolean;

    @Input()
    set type(type:Object) {
        this._name = "";
        if (type['suffix'] != undefined) {
            this._name = " " + type['suffix'];
        }
    }

    constructor() { }
}
