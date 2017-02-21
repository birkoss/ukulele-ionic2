import { Note } from './note';
import { Family } from './family';
import { Type } from './type';
import { Position, Finger } from './position';

export class Chord {
    positions: Array<Position> = [];
    scales: Array<Note> = [];

    constructor(chord:any, public note:Note, public family:Family, public type:Type) {
        for (let i=0; i<chord.positions.length; i++) {
            var position:Position = new Position();
            for (let fret in chord.positions[i]) {
                position.add(new Finger(fret, chord.positions[i][fret]));
            }
            position.generate();
            this.positions.push(position);
        }
    }

    public addScale(note:Note):void {
        this.scales.push(note);
    }

}
