import { Component, Input } from '@angular/core';

@Component({
    selector: 'musical-note',
    templateUrl: 'musical-note.html'
})
export class MusicalNote {
    @Input('note') note: string = "";
    @Input() direction: string = "up";

    constructor() {
        console.log(this.note);
        console.log(this.direction);
console.log('----------------------');
    }

    getClasses() {
        let classes: Array<string> = [];

        classes.push('direction-' + this.direction);
/*
        classes.push('note-' + this.note[0]);
        if (this.note[1] == '♭') {
            classes.push('note-flat');
        } else if (this.note[1] == '♯') {
            classes.push('note-sharp');
        }
*/
		console.log( this.note );
		console.log( this.direction );
console.log('----------------------');

        return classes.join(" ");
    }
}
