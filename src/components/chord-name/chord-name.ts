import { Component, Input } from '@angular/core';

import { Note } from '../../classes/note';

@Component({
    selector: 'chord-name',
    template: '<note-name [note]="note" [french]="french"></note-name>{{suffix}}'
})
export class ChordName {
    private suffix:string = "";

    @Input() note: Note;
    @Input() french: Boolean;

    @Input()
    set form(form:Object) {
        this.suffix = "";
        if (form['suffix'] != undefined) {
            this.suffix = " " + form['suffix'];
        }
    }

    constructor() { }
}
