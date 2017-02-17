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

	getPosition(direction) {
		console.log(this);
		console.log(this.position);
		console.log(this.position.position);
		return this.position.position == direction;
	}

	getFingers() {
		return this.position.fingers;
	}

	getFretClasses(finger:any) {
		let classes:Array<string> = [];

		classes.push('note');

		classes.push('fret-' + finger.fret);

		return classes.join(" ");
	}
}
