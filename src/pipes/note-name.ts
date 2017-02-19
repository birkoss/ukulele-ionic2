import { Pipe } from '@angular/core';

@Pipe({
    name: 'noteName'
})

export class NoteName {
    transform(value, args) {
        return value + "-";
    }
}
