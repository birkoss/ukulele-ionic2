export class Finger {
    constructor(public fret:string, public finger:number) { }
}

export class Position {
    fingers: Array<Finger> = [];

    constructor() {}

    public add(finger: Finger) :void {
        this.fingers.push(finger);
    }
}
