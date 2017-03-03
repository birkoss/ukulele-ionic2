export class ScaleBuilder {
    letters:Array<Object> = [];
    scale:Array<string> = [];

    currentIndex:number = 0;
    currentAccidental:number = 0;

    /* Set the letters to use */
    set(letters:Array<Object>) {
        this.letters = letters;
    }

    /* Add a letter in the scale and move the index */
    /* @TODO Replace double sharp with the correct symbol */
    select(letterName:string, accidental:number = 0) {
        this.currentAccidental = accidental;

        for (let i:number=0; i<this.letters.length; i++) {
            if (this.letters[i]['name'] == letterName) {
                while (accidental > 0) {
                    letterName += "♯";
                    accidental -= 0.5;
                }
                while (accidental < 0) {
                    letterName += "♭";
                    accidental += 0.5;
                }
                this.scale.push(letterName);
                this.currentIndex = i;
                break;
            }
        }
    }

    /* Create a scale with a specific steps of tone */
    create(steps:Array<number>) {
        for (let i:number=0; i<steps.length; i++) {
            let accidental:number = steps[i] - this.letters[this.currentIndex]['step']['up'] + this.currentAccidental;
            this.moveIndex();
            this.select(this.letters[this.currentIndex]['name'], accidental);
        }
    }

    private moveIndex() {
        this.currentIndex++;
        if (this.currentIndex >= this.letters.length) {
            this.currentIndex = 0;
        }
    }

    getScale():Array<string> {
        return this.scale;
    }
}
