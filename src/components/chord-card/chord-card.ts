import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';
import { Position } from '../../classes/position';
import { Type } from '../../classes/type';

@Component({
    selector: 'chord-card',
    templateUrl: 'chord-card.html'
})

export class ChordCard {
    private _note: Note;
    private _type: Type;
    private _position: Position;
    private _positionIndex: number;

	@Input('note')
    set note(note: string) {
        this._note = this.dataProvider.getNote(note); 
    }
	@Input('type')
    set type(type: string) {
        this._type = this.dataProvider.getType(type);
    }
	@Input('position')
    set position(position: number) {
        this._positionIndex = position;
        this._position = this.dataProvider.getPosition(this._note.name, this._type.name, position);
    }

    @Output() onDetailClicked: EventEmitter<Object> = new EventEmitter<Object>();

	constructor(private dataProvider: DataProvider, private config: ConfigProvider) {
	}

    public showDetail(): void {
        console.log('ChordCard...showDetail');
        this.onDetailClicked.emit({'note':this._note, 'type':this._type, 'position':this._positionIndex});
    }
}