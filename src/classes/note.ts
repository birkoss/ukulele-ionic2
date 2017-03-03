export class Note {
    name:string;
    french:string;
    direction:string;
    step:Object;

    isFavorited:Boolean = false;

    constructor(note:any) {
        this.name = note.name;
        this.french = note.french;
        this.direction = note.direction;
        this.step = note.step;
        if (!this.direction) {
            this.direction = 'up';
        }
    }

    toFavorite():Object {
        return {'note':this.name, 'direction':this.direction};
    }
}
