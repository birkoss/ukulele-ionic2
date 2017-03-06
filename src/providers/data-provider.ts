import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FavoritesProvider } from './favorites-provider';

import { Chord } from '../classes/chord';
import { String } from '../classes/string';
import { Note } from '../classes/note';
/* DEPRECATED */
import { Family } from '../classes/family';
/* DEPRECATED */
import { Type } from '../classes/type';
import { Position } from '../classes/position';

@Injectable()
export class DataProvider {
    private letters:Array<Object> = [];
    private notes: Array<Note> = [];
    private clefs:Array<Note> = [];
    private families: Array<Object> = [];
    private _types: Array<Object> = [];
    private chords: Array<Chord> = [];
    private scales:Array<Object> = [];

    constructor(public http:Http, public favoritesProvider:FavoritesProvider) { }

    /* Public */

    load():Promise<Boolean> {
        return this.http.get('assets/json/data.json').toPromise().then(res => {
            this.parseJSON(res.json()[0]);
            return Promise.resolve(true);
        });
    }

    save() {
        /*
        let favorites:Object = {'notes':[], 'chords':[]};
        for (let i=0; i<this.notes.length; i++) {
            if (this.notes[i].isFavorited) {
                favorites['notes'].push(this.notes[i].toFavorite());
            }
        }
        for (let i=0; i<this.chords.length; i++) {
            for (let j=0; j<this.chords[i].positions.length; j++) {
                if (this.chords[i].positions[j].isFavorited) {
                    favorites['chords'].push({'note':this.chords[i].note.name, 'type':this.chords[i].type.name, 'position':j});
                }
            }
        }
        this.favoritesProvider.save(favorites);
        */
    }

    getFamily(name:string):Object {
        for (let i=0; i<this.families.length; i++) {
            if (this.families[i]['name'] == name) {
                return this.families[i];
            }
        }
        return null;
    }

    getScales():Array<Object> {
        return this.scales;
    }

    getLetters():Array<Object> {
        return this.letters;
    }

    getNotes():Array<Note> {
        return this.notes;
    }

    getClefs():Array<Note> {
        return this.clefs;
    }

    /* @TODO: Type the accidental variable */
    getNote(name:string, accidental = 0):Note {
        for (let i=0; i<this.notes.length; i++) {
            if (this.notes[i].letter['name'] == name && this.notes[i].accidental == accidental) {
                return this.notes[i];
            }
        }
        return null;
    }

    pickNote():Note {
        let index:number = this.random(0, this.notes.length - 1);
        return this.notes[index];
    }

    getType(type:string, family:string = "Triad"):Object {
        for (let i=0; i<this._types.length; i++) {
            if (this._types[i]['name'] == type && this._types[i]['family']['name'] == family) {
                return this._types[i];
            }
        }
        return null;
    }

    getChords(type:string = "", note:string = ""):Array<Chord> {
        return this.chords.filter((chord) => {
            if (type != "" && chord.type['name'] != type) { return false; }
            if (note != "" && chord.note.name != note) { return false; }
            return true;
        });
    }

    getChord(note:string, type:string):Chord {
        return this.getChords(type, note)[0];
    }

    getPosition(note:string, type:string, position:number):Position {
        return this.getChord(note, type).positions[position]; 
    }

    get types():Array<Object> {
        return this._types;
    }

    /* Private */

    private parseJSON(json:Array<any>) {
        /* Save letters */
        for (let i=0; i<json['letters'].length; i++) {
            this.letters.push(json['letters'][i]); 
        }

        /* Generate notes from the letters */
        this.letters.forEach(letter => {
            if (letter['step']['down'] == 1) { this.notes.push(new Note(letter, -0.5)); }
            this.notes.push(new Note(letter, 0));
            if (letter['step']['up'] == 1) { this.notes.push(new Note(letter, 0.5)); }
        });

        /* Generate clefs */
        this.clefs = [];
        this.clefs.push(this.getNote('G'));
        this.clefs.push(this.getNote('C'));
        this.clefs.push(this.getNote('F'));

        /* Save scales */
        for (let i=0; i<json['scales'].length; i++) {
            this.scales.push(json['scales'][i]); 
        }

        /* Save families */
        for (let i=0; i<json['families'].length; i++) {
            this.families.push(json['families'][i]); 
        }

        for (let i=0; i<json['types'].length; i++) {
            let single_type:Object = json['types'][i];
            single_type['family'] = this.getFamily(single_type['family']);
            this._types.push(single_type);
        }

        /* Build the notes array used to build the scale */
        let scale_notes:Array<string> = [];
        let last_note:string = "";
        for (let i=0; i<this.notes.length; i++) {
            let note:string = this.notes[i].name;
            if (note[1] == "♯") {
                last_note = note;
            } else if (note[1] == "♭") {
                if (last_note == "") {
                    continue;
                }
                note = last_note + "/" + note;
                last_note = "";
            }
            /* Stop after the first duplicate */
            if (scale_notes.length > 1 && note == scale_notes[0]) { break; }
            /* Add the note if it's not a sharp note */
            if (last_note == "") { scale_notes.push(note); }
        }

        /* Double the notes array to make sure we can build our scale correctly */
        scale_notes = scale_notes.concat(scale_notes);

        /* Generate all the chords */
        for (var i=0; i<json['chords'].length; i++) {
            //let chord = new Chord(this.getNote(json['chords'][i]['note']), this.getFamily(json['chords'][i]['family']), this.getType(json['chords'][i]['type'], json['chords'][i]['family']));

            console.log('MUST RE-ENABLE PARSEJSON....');
            //this.buildPositions(chord, json['chords'][i]['positions'], scale_notes);

            //chord.init();

            //this.chords.push(chord);
        }
    }

    private buildPositions(chord:Chord, positions:any, notes:Array<string>) {
        for (let i:number=0; i<positions.length; i++) {
            let position:Position = new Position();
            position.addString(this.getNote('G'));
            position.addString(this.getNote('C'));
            position.addString(this.getNote('E'));
            position.addString(this.getNote('A'));

            position.isFavorited = this.favoritesProvider.exists({'note':chord.note.name, 'type':chord.type['name'], 'position':i}, 'chords');

            for (let frets in positions[i]) {
                var s:string = frets.substr(0, 1);
                var fret:number = parseInt(frets.substr(1));

                position.update(s, fret, this.getNoteFromFretPosition(chord, s, fret, notes), parseInt(positions[i][frets]));
            }
            chord.addPosition(position);
        }
    }

    private getNoteFromFretPosition(chord:Chord, stringName:string, direction:number, notes:Array<string>):Note {
        let note:string = "";
        for (let i:number=0; i<notes.length; i++) {
            if (notes[i] == stringName) {
                note = notes[i + direction];
                if (note.indexOf('/') >= 0) {
                    let parts = note.split('/');
                    note = parts[0]; /* @todo: Maybe use parts[1] */
                }
                break;
            }
        }
        return this.getNote(note);
    }

    private random(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

