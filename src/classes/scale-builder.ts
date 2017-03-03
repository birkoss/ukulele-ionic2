import { Note } from './note';

export class ScaleBuilder {
    letters:Array<Object> = [];
    scale:Array<Note> = [];

    currentIndex:number = 0;
    currentAccidental:number = 0;

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
    create(steps:Array<number>) {
        for (let i:number=0; i<steps.length; i++) {
            let step:number = steps[i];

            /* If the step is HIGHER than 1, we should switch index */
            while (step > 1) {
                step -= this.letters[this.currentIndex]['step']['up'];
                
                this.moveIndex();
            }

            let accidental:number = step - this.letters[this.currentIndex]['step']['up'] + this.currentAccidental;
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

    getScale():Array<Note> {
        return this.scale;
    }
}
