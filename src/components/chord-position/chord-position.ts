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
        return [1, 2, 3, 4];
		//return this.position.fingers;
	}

	getFretLabels() {
        let labels:Array<number> = [];
        for (let i:number=0; i<4; i++) {
            labels.push(this.position.start + i);
        }
        return labels;
	}

	getFretClasses(finger:any) {
		let classes:Array<string> = [];

		classes.push('finger');

		classes.push('fret-' + finger.className);

		return classes.join(" ");
	}

	getFretLabelsClasses(index:number) {
		let classes:Array<string> = [];
		
		classes.push('fret-label');

		classes.push('fret-label-' + (index+1));

		return classes.join(" ");
	}
}
