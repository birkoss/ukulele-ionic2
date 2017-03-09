import { Note } from './note';

export class Position {
    strings:Array<Object> = [];

    min:number = 1;
    start:number = 1;
    max:number = 1;

    constructor() {}

    addString(note:Note) {
        this.strings.push({'string':note, fret:0, note:note, finger:0});
    }

    /* Update the position when we have found the information */
    update(stringName:Object, fret:number, note:Note, finger:number) {
        this.strings.forEach(s => {
            if (s['string']['letter']['name'] == stringName) {
                s['fret'] = fret;
                s['note'] = note;
                s['finger'] = finger;
            }
        });

        this.init();
    }

    init() {
        this.min = 20;
        this.max = 0;

        this.strings.forEach(s => {
            if (s['fret'] > 0) {
                if (this.min > s['fret']) { this.min = s['fret']; }
                if (this.max < s['fret']) { this.max = s['fret']; }
            }
        });

        if (this.max > 4) { this.start = this.min; }
    }

}
