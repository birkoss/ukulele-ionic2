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

    _showHighNote:Boolean = false;
    position:number = 0;

    positions:Array<number> = [];

    @Input('note')
    set note(note:Note) {
        this._note = note;
    }
    @Input('showHighNote')
    set showHighNote(show:Boolean) {
        this._showHighNote = show;
    }
    @Input('forcePosition')
    set forcePosition(position:number) {
        this.position = position;
    }

    constructor(public data:DataProvider) { }

    ngDoCheck() {
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
        
        this.positions = [];
        this.positions.push(this.clefPosition - differenceIndex);

        console.log('H:' + this._showHighNote);
        if (this._showHighNote) {
            this.positions.push(this.positions[0] + this.data.getLetters().length);
        }

        if (this._note.accidental < 0) {
            this.accidental = 'flat';
        } else if (this._note.accidental > 0) {
            this.accidental = 'sharp';
        }
    }
}
