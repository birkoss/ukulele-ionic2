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

            console.log("Total Scale:" + this.scale.length);
            console.log("I:" + i);
            console.log("Step:" + step);
            console.log("Accidental:" + this.currentAccidental);
            console.log("Index: " + this.currentIndex);

            /* If the step is HIGHER than 1, we should switch index */
            while (step > 1) {
                console.log('Note step: ' + this.letters[this.currentIndex]['step']['up']);
                step -= this.letters[this.currentIndex]['step']['up'];// + this.currentAccidental;
                console.log("- Move Index!");
                this.moveIndex();
                console.log('- New index:' + this.currentIndex);
                console.log("= Step:" + step);
            }

            let accidental:number = step - this.letters[this.currentIndex]['step']['up'] + this.currentAccidental;
            this.moveIndex();
            this.select(this.letters[this.currentIndex]['name'], accidental);
            console.log("-----------------------------___");
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
