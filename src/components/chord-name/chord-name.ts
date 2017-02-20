import { Component, Input } from '@angular/core';

import { Note } from '../../classes/note';
import { Type } from '../../classes/type';

@Component({
    selector: 'chord-name',
    template: '<note-name [note]="note" [french]="french"></note-name>{{_name}}'
})
export class ChordName {
    private _name:string = "";

    @Input() note: Note;
    @Input() french: Boolean;

    @Input()
    set type(type:Type) {
        if (type.suffix != undefined) {
            this._name = " " + type.suffix;
        }
    }

    constructor() { }
}
