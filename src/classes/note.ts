export class Note {
    alternate:Note;

    constructor(public letter:Object, public accidental:number) { }

    setAlternate(note:Note) {
        this.alternate = note;
    }

    toString(inFrench:Boolean = false) {
        let name:string = (inFrench ? this.letter['french'] : this.letter['name']);

        let accidental:number = this.accidental;

        /* @TODO Replace double sharp with the correct symbol */
        while (accidental > 0) {
            name += "♯";
            accidental -= 0.5;
        }
        while (accidental < 0) {
            name += "♭";
            accidental += 0.5;
        }

        return name;
    }
}
