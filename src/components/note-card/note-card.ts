import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-card',
    templateUrl: 'note-card.html'
})

export class NoteCard {

    private _note:Note;
    private _singlePosition:number;

    private _clef:string = "G";

	@Input('note')
    set note(note:Note) {
        this._note = note;
    }
    @Input('singlePosition')
    set singlePosition(show:number) {
        this._singlePosition = show;
    }
    @Input('clef')
    set clef(clef:string) {
        this._clef = clef;
    }

    @Output('onButtonClicked') onButtonClicked:EventEmitter<Object> = new EventEmitter<Object>();

	constructor(private dataProvider:DataProvider, private config:ConfigProvider) { }

    public showDetail() {
        this.onButtonClicked.emit({'note':this._note, 'clef':this._clef, 'position':this._singlePosition});
    }
}
