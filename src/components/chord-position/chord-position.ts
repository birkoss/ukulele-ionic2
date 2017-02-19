import { Component, Input } from '@angular/core';

import { Position } from '../../classes/position';

@Component({
    selector: 'chord-position',
    templateUrl: 'chord-position.html'
})

export class ChordPosition {
	@Input('position') position: Position;

	constructor() {
		console.log(this);
		console.log(this.position);
	}

	getFingers() {
		return this.position.fingers;
	}

	getFretLabels() {
		return [1, 2, 3, 4];
	}

	getFretClasses(finger:any) {
		let classes:Array<string> = [];

		classes.push('finger');

		classes.push('fret-' + finger.fret);

		return classes.join(" ");
	}

	getFretLabelsClasses(index:number) {
		let classes:Array<string> = [];
		
		classes.push('fret-label');

		classes.push('fret-label-' + (index+1));

		return classes.join(" ");
	}
}
