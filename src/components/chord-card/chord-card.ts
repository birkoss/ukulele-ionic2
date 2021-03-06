import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    selector: 'chord-card',
    templateUrl: 'chord-card.html'
})

export class ChordCard {
    private _chord:Object;

    @Input('chord')
    set chord(chord:Object) {
        this._chord = chord;
    }

    @Output() onDetailClicked: EventEmitter<Object> = new EventEmitter<Object>();

	constructor(public data:DataProvider, public config:ConfigProvider) { }

    public showDetail() {
        this.onDetailClicked.emit({'chord':this._chord});
    }
}
