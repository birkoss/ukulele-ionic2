import { Component, Input } from '@angular/core';

import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'musical-note',
    templateUrl: 'musical-note.html'
})
export class MusicalNote {
    _note:Note;
    _direction:string;

    clef:string = "G";
    clefPosition:number = 5;

    line:number = 0;
    accidental:string = "";

    notes:Array<number> = [];

    @Input('note')
    set note(note:Note) {
        this._note = note;
    }

    constructor(public data:DataProvider) { }

    ngOnInit() {
        let clefIndex:number = 0;
        let noteIndex:number = 0;

        let letters:Array<Object> = this.data.getLetters();
        for (let i:number=0; i<letters.length; i++) {
            if (letters[i]['name'] == this.clef) {
                clefIndex = i;
            }
            if (letters[i]['name'] == this._note.letter['name']) {
                noteIndex = i;
            }
        }

        let differenceIndex:number = clefIndex - noteIndex;
        
        this.notes.push(this.clefPosition - differenceIndex);
        this.notes.push(this.notes[0] + this.data.getLetters().length);

        if (this._note.accidental < 0) {
            this.accidental = 'flat';
        } else if (this._note.accidental > 0) {
            this.accidental = 'sharp';
        }
    }
}
