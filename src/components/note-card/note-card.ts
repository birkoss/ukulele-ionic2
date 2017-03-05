import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

import { Note } from '../../classes/note';

@Component({
    selector: 'note-card',
    templateUrl: 'note-card.html'
})

export class NoteCard {
    private noteName:string;
    private noteDirection:string;

    private _note:Note;
    private _singlePosition;

    private _clef:string = "G";

	@Input('note')
    set note(note:Note) {
        this._note = note;
    }
    @Input('direction') set direction(direction:string) { this.noteDirection = direction; }
    @Input('singlePosition')
    set singlePosition(show:Boolean) {
        this._singlePosition = show;
    }
    @Input('clef')
    set clef(clef:string) {
        this._clef = clef;
    }

    @Output('onButtonClicked') onButtonClicked:EventEmitter<Note> = new EventEmitter<Note>();

	constructor(private dataProvider:DataProvider, private config:ConfigProvider) { }

    public showDetail():void {
        this.onButtonClicked.emit(this._note);
    }
}
