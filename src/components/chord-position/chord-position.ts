import { Component, Input } from '@angular/core';

import { Position } from '../../classes/position';
import { Note } from '../../classes/note';

@Component({
    selector: 'chord-position',
    templateUrl: 'chord-position.html'
})

export class ChordPosition {
    private _position:Position;

    start:number = 0;
    strings:Array<any>;
    fingers:Array<any> = [];
    muted:Object = {};
    labels:Array<number> = [];

	@Input('position')
    set position(position:Position) {
        this._position = position;

        this.start = this._position.start;
        this.strings = this._position.strings;

        this._position.strings.filter(s => {
            if (s.fret > 0) {
                this.fingers.push(s);
            }

            if (s.finger == -1) {
                this.muted[s.note.name] = true;
            }
        });

        for (let i:number=0; i<4; i++) {
            this.labels.push(this.start + i);
        }
    }

	constructor() { }
}
