import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { FavoritesProvider } from './favorites-provider';

import { Chord } from '../classes/chord';
import { Note } from '../classes/note';
import { Position } from '../classes/position';

import { ScaleBuilder } from '../classes/scale-builder';

@Injectable()
export class DataProvider {
    private letters:Array<Object> = [];
    private notes: Array<Note> = [];
    private clefs:Array<Note> = [];
    private forms:Array<Object> = [];
    private chords: Array<Chord> = [];
    private scales:Array<Object> = [];

    constructor(public http:Http, public favoritesProvider:FavoritesProvider) { }

    load():Promise<Boolean> {
        return this.http.get('assets/json/data.json').toPromise().then(res => {
            this.parseJSON(res.json()[0]);
            return Promise.resolve(true);
        });
    }

    getScales():Array<Object> {
        return this.scales;
    }

    getScale(name:string):Object {
        return this.getScales().filter(scale => {
            return scale['name'] == name;
        })[0];
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

    getNote(name:string, accidental:number = 0):Note {
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

    getChords():Array<Chord> {
        return this.chords;
    }

    getChord(note:Note, form:Object):Chord {
        return this.getChords().filter(chord => {
            if (chord.note.letter['name'] == note.letter['name'] && chord.note.accidental == note.accidental && chord.form['type'] == form['type'] && chord.form['quality'] == form['quality']) {
                return chord;
            }
        })[0];
    }

    /*
    getPosition(note:string, type:string, position:number):Position {
        return this.getChord(note, type).positions[position]; 
    }
    */

    getForms():Array<Object> {
        return this.forms;
    }

    getForm(type:string, quality:string):Object {
        return this.getForms().filter(form => {
            return (form['type'] == type && form['quality'] == quality);
        })[0];
    }

    /* Private */

    private parseJSON(json:Array<any>) {
        /* Save letters */
        for (let i=0; i<json['letters'].length; i++) {
            this.letters.push(json['letters'][i]); 
        }

        /* Generate notes from the letters */
        this.letters.forEach(letter => {
            if (letter['step']['down'] == 1) {
                this.notes.push(new Note(letter, -0.5));
            }
            this.notes.push(new Note(letter, 0));
            if (letter['step']['up'] == 1) { this.notes.push(new Note(letter, 0.5)); }
        });

        /* Generate alternate name for the notes */
        this.notes.forEach(note => {
            if (note.accidental < 0) {
                let letterName:string = String.fromCharCode(note.letter['name'].charCodeAt(0) - 1);
                if (letterName == '@') {
                    letterName = 'G';
                }
                note.setAlternate(this.getNote(letterName, 0.5));
            } else if (note.accidental > 0) {
                let letterName:string = String.fromCharCode(note.letter['name'].charCodeAt(0) + 1);
                if (letterName == 'H') {
                    letterName = 'A';
                }
                note.setAlternate(this.getNote(letterName, -0.5));
            }
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

        /* Save forms */
        for (let i=0; i<json['forms'].length; i++) {
            this.forms.push(json['forms'][i]); 
        }

        /* Generate all the chords */
        for (var i=0; i<json['chords'].length; i++) {
            let accidental:number = 0;
            if (json['chords'][i]['note'].substr(1) == '♭') {
                accidental = -0.5;
            } else if (json['chords'][i]['note'].substr(1) == '♯') {
                accidental = 0.5;
            }
            let letterName:string = json['chords'][i]['note'].substr(0, 1);
            let chord:Chord = new Chord(this.getNote(letterName, accidental), this.getForm(json['chords'][i]['type'], json['chords'][i]['quality']));
            chord.positions = this.buildPositions(json['chords'][i]['positions']);
            this.chords.push(chord);
        }
    }

    private buildPositions(positions:any):Array<Position> {
        let chordPositions:Array<Position> = [];

        for (let i:number=0; i<positions.length; i++) {
            let position:Position = new Position();
            position.addString(this.getNote('G'));
            position.addString(this.getNote('C'));
            position.addString(this.getNote('E'));
            position.addString(this.getNote('A'));

            for (let frets in positions[i]) {
                var s:string = frets.substr(0, 1);
                var fret:number = parseInt(frets.substr(1));

                let started:Boolean = false;
                let currentNote:Note = null;
                let currentFret = 0;

                let builder:ScaleBuilder = new ScaleBuilder();
                builder.set(this.getLetters());
                builder.select(s, 0);
                builder.create(this.getScale('Chromatic')['steps'], false);
                builder.getScale().forEach(note => {
                    if (note.letter['name'] == s && note.accidental == 0 && currentNote == null) {
                        started = true;
                    } else if (started) {
                        currentFret++;
                        if (currentFret >= fret) {
                            started = false;
                            currentNote = note;
                        }
                    }
                });

                if (currentNote != null) {
                    position.update(s, fret, currentNote, parseInt(positions[i][frets]));
                }
            }

            chordPositions.push(position);
        }

        return chordPositions;
    }

    private random(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

