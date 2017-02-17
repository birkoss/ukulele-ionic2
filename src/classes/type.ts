import { Family } from './family';

export class Type {
    name:string;
    scale:Array<number> = [];
    scale_part:Array<number> = [];

    constructor(type:any, public family: Family) {
        this.name = type.name;
    }
}
