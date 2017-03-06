import { Note } from './note';
import { Position } from './position';

export class Chord {
    positions: Array<Position> = [];

    constructor(public note:Note, public form:Object) { }

    addPosition(position:Position) {
        this.positions.push(position);
    }

    init() {
        for (let i:number=0; i<this.positions.length; i++) {
            this.positions[i].init();
        }
    }
}
