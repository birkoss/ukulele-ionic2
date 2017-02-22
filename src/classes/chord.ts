import { Note } from './note';
import { Family } from './family';
import { Type } from './type';
import { Position, String } from './position';

export class Chord {
    positions: Array<Position> = [];
    scales: Array<Note> = [];

    constructor(public note:Note, public family:Family, public type:Type) { }

    public addScale(note:Note):void {
        this.scales.push(note);
    }

    public addPosition(position:Position):void {
        this.positions.push(position);
    }

    public hasNoteInScale(note:string):Boolean {
        for (let i:number=0; i<this.scales.length; i++) {
            if (this.scales[i].name == note) {
                return true;
            }
        }
        return false;
    }
}
