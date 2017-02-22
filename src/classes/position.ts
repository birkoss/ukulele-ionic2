import { Note } from './note';

export class Finger {
    className:string = "";

    constructor(public fret:string, public finger:number) { }

    public getFretPosition():number {
        return parseInt(this.fret.substr(1, this.fret.length-1));
    }

    public generate(start:number):void {
        this.className = this.fret.substr(0, 1) + (this.getFretPosition() - start + 1);
    }

}

export class Position {
    fingers:Array<Finger> = [];
    frets:Array<number> = [];
    notes:Array<Note> = [];

    start:number = 1;

    constructor() {}

    public add(finger:Finger):void {
        this.fingers.push(finger);
    }

    public generate():void {
        this.start = 20;
        for (let i:number=0; i<this.fingers.length; i++) {
            if (this.start > this.fingers[i].getFretPosition()) {
                this.start = this.fingers[i].getFretPosition();
            }
        }

        for (let i:number=0; i<this.fingers.length; i++) {
            this.fingers[i].generate(this.start);
        }
    }
}
