import { Note } from './note';

export class String {
    name:Note;
    fret:number = 0;
    note:Note;
    finger:number = 0;
}

export class Position {
    strings:Array<String> = [];

    min:number = 1;
    start:number = 1;
    max:number = 1;

    isFavorited:Boolean = false;

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

    public init():void {
        this.min = 20;
        this.max = 0;
        for (let i:number=0; i<this.strings.length; i++) {
            if (this.strings[i].fret > 0) {
                if (this.min > this.strings[i].fret) {
                    this.min = this.strings[i].fret;
                }
                if (this.max < this.strings[i].fret) {
                    this.max = this.strings[i].fret;
                }
            }
        }

        if (this.max > 4) {
            this.start = this.min;
        }

        /* @todo: Detect the range, if > 5, alert */
    }

}
