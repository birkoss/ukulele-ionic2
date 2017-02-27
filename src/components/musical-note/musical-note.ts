import { Component, Input } from '@angular/core';

import { Note } from '../../classes/note';

@Component({
    selector: 'musical-note',
    templateUrl: 'musical-note.html'
})
export class MusicalNote {
    _note:Note;
    _direction:string;

    @Input('note')
    set note(note:Note) {
        this._note = note;
        this._direction = "up";//note.direction;
    }

    constructor() { }

    getClasses() {
        let classes: Array<string> = [];

        classes.push('direction-' + this._direction);

        if (this._note != undefined) {
            classes.push('note-' + this._note.name[0]);
        }
/*
        classes.push('note-' + this.note[0]);
        if (this.note[1] == '♭') {
            classes.push('note-flat');
        } else if (this.note[1] == '♯') {
            classes.push('note-sharp');
        }
*/
        return classes.join(" ");
    }
}
