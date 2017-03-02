import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Position } from '../../classes/position';
import { Note } from '../../classes/note';

import { DataProvider } from '../../providers/data-provider';

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
    _interactive:Boolean = false;

	@Input('position')
    set position(position:Position) {
        if (position == null || position == undefined) {
            return;
        }

        this._position = position;

        this.start = this._position.start;
        this.strings = this._position.strings;

        this.labels = [];
        this.fingers = [];
        this.muted = [];
        this._position.strings.filter(s => {
            if (s.fret > 0) {
                this.fingers.push({'string':s.name.name, 'fret':s.fret-this.start+1, 'finger':s.finger});
            }

            if (s.finger == -1) {
                this.muted[s.note.name] = true;
            }
        });

        for (let i:number=0; i<4; i++) {
            this.labels.push(this.start + i);
        }
    }

    @Input('interactive')
    set interactive(interactive:Boolean) {
        this._interactive = interactive;
        if (this._interactive) {
            this.fingers = [];
            this.labels = [1, 2, 3, 4];
            this.start = 1;
        }
    }

    @Input('startPosition')
    set startPosition(start:number) {
        this.start = start;

        this.labels = [];
        for (let i:number=0; i<4; i++) {
            this.labels.push(i + this.start);
        }

        /* Trigger the markers on every fret position changes */
        this.onMarkerToggled.emit(this.fingers);
    }

    @Output() onMarkerToggled: EventEmitter<Object> = new EventEmitter<Object>();

	constructor(public data:DataProvider) { }

    public toggleMarker(event):void {
        if (this._interactive) {
            let svg_parent;
            for (var i=0; i<event.path.length; i++) {
                if (event.path[i].nodeName == 'svg') {
                    svg_parent = event.path[i];
                }
            }

            var x = event.offsetX;
            var y = event.offsetY;
            var parent_width = svg_parent.clientWidth;

            var scale = (parent_width / 250);

            var origin_start = 36 * scale;
            var grid_size = 55 * scale;

            x-= origin_start;
            y-= origin_start;

            var p_x = Math.min(3, Math.max(0, Math.round(x / grid_size)));
            var p_y = Math.min(3, Math.max(0, Math.floor(y / grid_size)));

            var strings = {'0':'G', '1':'C', '2':'E', '3':'A'};

            let stringName = strings[p_x];
            let fretPosition = (p_y+1);

            console.log(stringName + " : " + fretPosition);
            // Find if this position already exists
            let found = false;
            for (var i=0; i<this.fingers.length; i++) {
                if (this.fingers[i].string == stringName && this.fingers[i].fret == fretPosition) {
                    found = true;
                    this.fingers.splice(i, 1);
                    break;
                }
            }

            /* Add this position if it's a new position */
            if (!found) {
                this.fingers.push({'string':stringName, 'fret':fretPosition + 0});
            }

            this.onMarkerToggled.emit(this.fingers);
        }
    }
}
