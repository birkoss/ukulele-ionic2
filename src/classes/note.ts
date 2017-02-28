export class Note {
    name:string;
    french:string;
    direction:string;

    constructor(note:any) {
        this.name = note.name;
        this.french = note.french;
        this.direction = note.direction;
        if (!this.direction) {
            this.direction = 'up';
        }
    }
}
