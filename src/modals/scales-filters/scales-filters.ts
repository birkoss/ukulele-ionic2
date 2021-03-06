import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config-provider';
import { DataProvider } from '../../providers/data-provider';

@Component({
    selector: 'scales-filters-modal',
    templateUrl: 'scales-filters.html'
})

export class ScalesFiltersModal {
    scales:Array<Object> = [];
    notes:Array<Object> = [];

    notesFilters:Array<Object> = [
        {'name':'All', 'value':'all'},
        {'name':'♮', 'value':'natural'},
        {'name':'♭', 'value':'flat'},
        {'name':'♯', 'value':'sharp'},
    ];
    notesFilter:string = "all";

    parent:any;

    constructor(public viewCtrl:ViewController, private data:DataProvider, public config:ConfigProvider, params:NavParams) {
        this.parent = params.get('parent');
    }

    ionViewDidEnter() {
        this.scales = this.data.getScales();
        this.notesFilter = "all";
        this.generateNotes(this.notesFilter);
    }

    close() {
        this.viewCtrl.dismiss();
    }

    generateNotes(notesFilter) {
        this.notes = this.data.getNotes().filter(note => {
            switch (notesFilter) {
                case 'natural':
                    return (note.accidental == 0);
                case 'sharp':
                    return (note.accidental > 0);
                case 'flat':
                    return (note.accidental < 0);
            }

            return true;
        });
    }

    onChanged(element) {
        this.config.save();
        this.parent.generateList();
    }

    onFilterChanged(element) {
        this.notesFilter = element.value;
        this.generateNotes(this.notesFilter);
    }
}
