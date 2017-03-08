export class Note {
    alternate:Note;

    constructor(public letter:Object, public accidental:number) { }

    setAlternate(note:Note) {
        this.alternate = note;
    }

    toString(inFrench:Boolean = false) {
        let name:string = (inFrench ? this.letter['french'] : this.letter['name']);

        let accidental:number = this.accidental;

        /* Double sharp */
        while (accidental >= 1) {
            name += "x";
            accidental -= 1;
        }
        /* Sharp */
        while (accidental > 0) {
            name += "♯";
            accidental -= 0.5;
        }
        /* Flat */
        while (accidental < 0) {
            name += "♭";
            accidental += 0.5;
        }

        return name;
    }
}
