import { Component, OnInit, ViewChild, AfterViewInit, QueryList, ElementRef, TemplateRef } from '@angular/core';
import {
  TsChipCollectionComponent,
  TsChipComponent,
 } from '@terminus/ui/chip';

@Component({
  selector: 'demo-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent implements OnInit {

  options = ['banana', 'apple', 'orange', 'pear'];

  constructor() { }

  ngOnInit() {
  }

  removingOption(value: string) {
    const ctrlValue = this.options;
    const index = ctrlValue.indexOf(value);
    const selections = ctrlValue.slice();
    // If not found
    if (index < 0) {
      return;
    }
    selections.splice(index, 1);
    this.options = selections;
  }

  change(value: string | string[]) {
    console.log('DEMO: collection change triggered value: ', value);
  }

}
