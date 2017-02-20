import { Component, Input } from '@angular/core';

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
       this._position = this.dataProvider.getPosition(this._note.name, this._type.name, position);
    }

	constructor(private dataProvider: DataProvider, private config: ConfigProvider) {
	}
}
