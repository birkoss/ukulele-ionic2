import { Note } from './note';

export class ScaleBuilder {
    letters:Array<Object> = [];
    scale:Array<Note> = [];

    currentIndex:number = 0;
    currentAccidental:number = 0;

    direction:string = "";

    /* Set the letters to use */
    set(letters:Array<Object>) {
        this.letters = letters;
    }

    /* Add a letter in the scale and move the index */
    select(letterName:string, accidental:number = 0) {
        this.currentAccidental = accidental;

        for (let i:number=0; i<this.letters.length; i++) {
            if (this.letters[i]['name'] == letterName) {
                this.scale.push(new Note(this.letters[i], accidental));
                this.currentIndex = i;
                break;
            }
        }
    }

    /* Create a scale with a specific steps of tone */
    create(steps:Array<number>, uniqueLetter:Boolean = true, direction:string = "up") {
        this.direction = direction;

        for (let i:number=0; i<steps.length; i++) {
            let step:number = steps[i];
            let accidental:number = 0;

            if (uniqueLetter) {
                /* If the step is HIGHER than 1, we should switch index */
                while (step > 1) {
                    step -= this.letters[this.currentIndex]['step']['up'];
                    this.moveIndex();
                }

                accidental = step - this.letters[this.currentIndex]['step']['up'] + this.currentAccidental;
                this.moveIndex();
            } else {
               if (this.direction == "up" && (this.currentAccidental > 0 || this.letters[this.currentIndex]['step']['up'] == 0.5)) {
                   this.moveIndex();
                   this.currentAccidental = 0;
               } else if(this.direction == "down" && (this.currentAccidental < 0 || this.letters[this.currentIndex]['step']['down'] == 0.5)) {
                   this.moveIndex(-1);
                   this.currentAccidental = 0;
               } else {
                   this.currentAccidental += step * (this.direction == 'down' ? -1 : 1);
               }
               accidental = this.currentAccidental;
            }
            this.select(this.letters[this.currentIndex]['name'], accidental);
        }

        if (this.direction == "down") {
            this.scale.reverse();
        }
    }

    moveIndex(mod:number = 1) {
        this.currentIndex += mod;
        if (this.currentIndex >= this.letters.length) {
            this.currentIndex = 0;
        }
        if (this.currentIndex < 0) {
            this.currentIndex = this.letters.length - 1;
        }
    }

    getScale():Array<Note> {
        return this.scale;
    }
}
