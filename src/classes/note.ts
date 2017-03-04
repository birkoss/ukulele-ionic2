export class Note {
    name:string = "DEPRECATED";
    french:string = "DEPRECATED";
    direction:string = "DEPRECATED";

    isFavorited:Boolean = false;

    constructor(public letter:Object, public accidental:number) { }

    toFavorite() {
        return "DEPRECATED";
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
