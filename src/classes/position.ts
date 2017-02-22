import { Note } from './note';

export class String {
    name:Note;
    fret:number = 0;
    note:Note;
    finger:number = 0;
}

export class Position {
    strings:Array<String> = [];

    start:number = 1;

    constructor() {}

    public addString(note:Note):void {
        this.strings.push({name:note, fret:0, note:note, finger:0});
    }

    /* Update the position when we have found the information */
    public update(stringName:string, fret:number, note:Note, finger:number):void {
        for (var i:number=0; i<this.strings.length; i++) {
            if (this.strings[i].name.name == stringName) {
                this.strings[i].fret = fret;
                this.strings[i].note = note;
                this.strings[i].finger = finger;
                break;
            }
        }
    }
}
