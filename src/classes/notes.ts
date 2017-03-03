import { Note } from './note';

export class NotesBrowser {
    notes:Array<Note> = [];
    scale:Array<string> = [];

    currentIndex:number = 0;
    currentAccidental:number = 0;

    set(notes:Array<Note>) {
        this.notes = notes;
    }

    select(noteName:string, accidental:number = 0) {
        this.currentAccidental = accidental;

        for (let i:number=0; i<this.notes.length; i++) {
            if (this.notes[i].name == noteName) {
                while (accidental > 0) {
                    noteName += "♯";
                    accidental -= 0.5;
                }
                while (accidental < 0) {
                    noteName += "♭";
                    accidental += 0.5;
                }
                this.scale.push(noteName);
                this.currentIndex = i;
                break;
            }
        }
    }

    apply(steps:Array<number>) {
        for (let i:number=0; i<steps.length; i++) {
            let accidental:number = steps[i] - this.notes[this.currentIndex]['step']['up'] + this.currentAccidental;
            this.moveIndex();
            this.select(this.notes[this.currentIndex].name, accidental);
        }
    }

    private moveIndex() {
        this.currentIndex++;
        if (this.currentIndex >= this.notes.length) {
            this.currentIndex = 0;
        }
    }

    getScale():Array<string> {
        return this.scale;
    }
}
