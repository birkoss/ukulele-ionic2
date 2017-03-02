import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FavoritesProvider } from './favorites-provider';

import { Chord } from '../classes/chord';
import { String } from '../classes/string';
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

    constructor(public http:Http, public favoritesProvider:FavoritesProvider) { }

    /* Public */

    public load():Promise<Boolean> {
        return this.http.get('assets/json/data.json').toPromise().then(res => {
            this.parseJSON(res.json()[0]);
            return Promise.resolve(true);
        });
    }

    public save():void {
        console.log('dp.save');
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
        console.log(favorites);
        this.favoritesProvider.save(favorites);
    }

    public getFamily(name:string) : Family {
        for (let i=0; i<this.families.length; i++) {
            if (this.families[i].name == name) {
                return this.families[i];
            }
        }
        return null;
    }

    public getNotes():Array<Note> {
        return this.notes;
    }

    public getNote(name:string, direction:string = ""):Note {
        for (let i=0; i<this.notes.length; i++) {
            if (this.notes[i].name == name && (direction == "" || this.notes[i].direction == direction)) {
                return this.notes[i];
            }
        }
        return null;
    }

    public pickNote():Note {
        return this.notes[this.random(0, this.notes.length)];
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
        return this.getChord(note, type).positions[position]; 
    }

    public get types(): Array<Type> {
        return this._types;
    }

    /* Private */

    private parseJSON(json:Array<any>) : void {
        for (let i=0; i<json['notes'].length; i++) {
            let note:Note = new Note(json['notes'][i]);
            note.isFavorited = this.favoritesProvider.exists(note.toFavorite(), 'notes');
            this.notes.push(note); 
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
            let chord = new Chord(this.getNote(json['chords'][i]['note']), this.getFamily(json['chords'][i]['family']), this.getType(json['chords'][i]['type'], json['chords'][i]['family']));

            this.buildPositions(chord, json['chords'][i]['positions'], scale_notes);

            chord.init();

            this.chords.push(chord);
        }
    }

    private buildPositions(chord:Chord, positions:any, notes:Array<string>):void {
        for (let i:number=0; i<positions.length; i++) {
            let position:Position = new Position();
            position.addString(this.getNote('G'));
            position.addString(this.getNote('C'));
            position.addString(this.getNote('E'));
            position.addString(this.getNote('A'));

            position.isFavorited = this.favoritesProvider.exists({'note':chord.note.name, 'type':chord.type.name, 'position':i}, 'chords');

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

