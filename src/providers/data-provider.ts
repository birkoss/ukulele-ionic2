import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Chord } from '../classes/chord';
import { Note } from '../classes/note';
import { Family } from '../classes/family';
import { Type } from '../classes/type';

@Injectable()
export class DataProvider {
    private notes: Array<Note> = [];
    private families: Array<Family> = [];
    private types: Array<Type> = [];
    private chords: Array<Chord> = [];

    constructor(public http:Http) {
        this.http.get('assets/json/data.json').map(res => res.json()).subscribe(result => {this.parseJSON(result[0]);});
    }

    public all() : void {
        console.log('all...');
    }

    getChords() {
    }


    private parseJSON(json:Array<any>) : void {
        for (let i=0; i<json['notes'].length; i++) {
           this.notes.push(new Note(json['notes'][i])); 
        }

        for (let i=0; i<json['families'].length; i++) {
           this.families.push(new Family(json['families'][i])); 
        }

        for (let i=0; i<json['types'].length; i++) {
           this.types.push(new Type(json['types'][i], this.getFamily(json['types'][i]['family']))); 
        }

        for (var i=0; i<json['chords'].length; i++) {
            this.chords.push(new Chord(json['chords'][i], this.getNote(json['chords'][i]['note']), this.getFamily(json['chords'][i]['family']), this.getType(json['chords'][i]['type'], json['chords'][i]['family'])));
        }
    }

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

    public getType(type:string, family:string) : Type {
        for (let i=0; i<this.types.length; i++) {
            if (this.types[i].name == type && this.types[i].family.name == family) {
                return this.types[i];
            }
        }
        return null;
    }

}

