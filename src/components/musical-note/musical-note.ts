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

    _clef:string = "G";
    clefPositions:Object = {"G": 5, "F":6, "C":7};

    line:number = 0;
    accidental:string = "";

    position:number = 0;

    positions:Array<number> = [];

    @Input('note')
    set note(note:Note) {
        this._note = note;
    }
    @Input('singlePosition')
    set singlePosition(position:number) {
        this.position = position;
    }
    @Input("clef")
    set clef(clef:string) {
        this._clef = clef;
    }

    constructor(public data:DataProvider) { }

    ngDoCheck() {
        let clefIndex:number = 0;
        let noteIndex:number = 0;

        let letters:Array<Object> = this.data.getLetters();
        for (let i:number=0; i<letters.length; i++) {
            if (letters[i]['name'] == this._clef) {
                clefIndex = i;
            }
            if (letters[i]['name'] == this._note.letter['name']) {
                noteIndex = i;
            }
        }

        let differenceIndex:number = clefIndex - noteIndex;
        let firstPosition:number = this.clefPositions[this._clef] - differenceIndex;
        let secondPosition:number = firstPosition + this.data.getLetters().length;
        if (secondPosition > (this.data.getLetters().length * 2)) {
            secondPosition -= (this.data.getLetters().length * 2);
        }

        this.positions = [];

        if (this.position == 1 || this.position == 0) {
            this.positions.push(firstPosition);
        }

        if (this.position == 2 || this.position == 0) {
            this.positions.push(secondPosition);
        }

        if (this._note.accidental < 0) {
            this.accidental = 'flat';
        } else if (this._note.accidental > 0) {
            this.accidental = 'sharp';
        }
    }
}
