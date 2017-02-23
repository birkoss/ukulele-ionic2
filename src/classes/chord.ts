import { Note } from './note';
import { Family } from './family';
import { Type } from './type';
import { Position, String } from './position';

export class Chord {
    positions: Array<Position> = [];

    constructor(public note:Note, public family:Family, public type:Type) { }

    public addPosition(position:Position):void {
        this.positions.push(position);
    }

    public init():void {
        for (let i:number=0; i<this.positions.length; i++) {
            this.positions[i].init();
        }
    }
}
