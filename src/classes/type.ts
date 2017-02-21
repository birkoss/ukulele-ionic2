import { Family } from './family';

export class Type {
    name:string;
    suffix:string;
    scale:Array<number> = [];
    scale_parts:Array<number> = [];

    constructor(type:any, public family: Family) {
        this.name = type.name;
        this.suffix = type.suffix;
        this.scale = type.scale;
        this.scale_parts = type.scale_parts;
    }
}
