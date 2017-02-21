import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Chord } from '../classes/chord';
import { Note } from '../classes/note';
import { Family } from '../classes/family';
import { Type } from '../classes/type';
import { Position } from '../classes/position';

@Injectable()
export class DataProvider {
    private notes: Array<Note> = [];
    private families: Array<Family> = [];
    private _types: Array<Type> = [];
    private chords: Array<Chord> = [];

    constructor(public http:Http) {
        this.http.get('assets/json/data.json').map(res => res.json()).subscribe(result => {this.parseJSON(result[0]);});
    }

    /* Public */

    public getFamily(name:string) : Family {
        for (let i=0; i<this.families.length; i++) {
            if (this.families[i].name == name) {
                return this.families[i];
            }
        }
        return null;
    }

    public getNote(name:string) : Note {
        for (let i=0; i<this.notes.length; i++) {
            if (this.notes[i].name == name) {
                return this.notes[i];
            }
        }
        return null;
    }

    public getType(type:string, family:string = "Triad") : Type {
        for (let i=0; i<this._types.length; i++) {
            if (this._types[i].name == type && this._types[i].family.name == family) {
                return this._types[i];
            }
        }
        return null;
    }
    
    public getChords(type:string = "", note:string = "") : Array<Chord> {
        return this.chords.filter((chord) => {
            if (type != "" && chord.type.name != type) { return false; }
            if (note != "" && chord.note.name != note) { return false; }
            return true;
        });
    }

    public getChord(note:string, type:string): Chord {
        return this.getChords(type, note)[0];
    }

    public getPosition(note:string, type:string, position:number): Position {
        console.log('Position:' + position);
       return this.getChord(note, type).positions[position]; 
    }

    public get types(): Array<Type> {
        return this._types;
    }

    /* Private */

    private parseJSON(json:Array<any>) : void {
        for (let i=0; i<json['notes'].length; i++) {
           this.notes.push(new Note(json['notes'][i])); 
        }

        for (let i=0; i<json['families'].length; i++) {
           this.families.push(new Family(json['families'][i])); 
        }

        for (let i=0; i<json['types'].length; i++) {
           this._types.push(new Type(json['types'][i], this.getFamily(json['types'][i]['family']))); 
        }

        /* Build the notes array used to build the scale */
        let scale_notes:Array<string> = [];
        let last_note:string = "";
        for (let i=0; i<this.notes.length; i++) {
            let note:string = this.notes[i].name;
            if (note[1] == "♯") {
                last_note = note;
            } else if (note[1] == "♭") {
                note = last_note + "/" + note;
                last_note = "";
            }

            /* Stop after the first duplicate */
            if (scale_notes.length > 1 && note == scale_notes[0]) { break; }
           
            /* Add the note if it's not a sharp note */
            if (last_note == "") { scale_notes.push(note); }
        }

        /* Double the notes array to make sure we can build our scale */
        scale_notes = scale_notes.concat(scale_notes);

        /* Generate all the chords */
        for (var i=0; i<json['chords'].length; i++) {
            let chord = new Chord(json['chords'][i], this.getNote(json['chords'][i]['note']), this.getFamily(json['chords'][i]['family']), this.getType(json['chords'][i]['type'], json['chords'][i]['family']));

            this.buildScale(chord, scale_notes); 

            this.chords.push(chord);
        }
    }

    private buildScale(chord:Chord, notes:Array<string>): void {
        let scales:Array<string> = [];

        for (let i:number=0; i<notes.length; i++) {
            if (notes[i] == chord.note.name) {
                scales.push(notes[i]);
                for (let j:number=0; j<chord.type.scale.length; j++) {
                    i += chord.type.scale[j];
                    let double_notes = notes[i].split('/');
                    let note = double_notes[0];

                    /* Find the nest note if it's a double notes (sharp or flat) */
                    if (double_notes.length > 1) {
                        /* If the previous note start with the same letter, use the flat instead */
                        if (scales[scales.length-1].substr(0, 1) == note.substr(0, 1)) {
                            note = double_notes[1];
                        }

                        /* If the first note is a flat, use a flat */
                        if (notes[0][1] == '♭') {
                            note = double_notes[1];
                        }
                    } else {
                        /* Special case where a C♭ (instead of a B) or an E♯ (instead of F) may be required */
                        if (note == 'B' || note == 'F') {
                            let special_cases = {'B': 'C♭', 'F': 'E♯'};
                            if (scales[scales.length-1].substr(0, 1) == note) {
                                note = special_cases[note];
                            }
                        }
                    }

                    scales.push(note);
                }
            }
        }

        for (let i:number=0; i<scales.length; i++) {
            chord.addScale(this.getNote(scales[i]));
        }
    }
}

