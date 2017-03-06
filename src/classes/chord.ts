import { Note } from './note';
import { Position, String } from './position';

export class Chord {
    positions: Array<Position> = [];

    constructor(public note:Note, public family:Object, public type:Object) { }

    public addPosition(position:Position):void {
        this.positions.push(position);
    }

    public init():void {
        for (let i:number=0; i<this.positions.length; i++) {
            this.positions[i].init();
        }
    }
}
