import { Component } from '@angular/core';
import {
  TsChipCollectionChange,
  TsChipCollectionOrientation,
  TsChipEvent,
} from '@terminus/ui/chip';


@Component({
  selector: 'demo-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  public orientation: TsChipCollectionOrientation = 'horizontal';
  public removable = true;
  public disabled = false;
  public readonly = false;
  public selectable = true;
  public optionsOriginal = ['banana', 'apple', 'orange', 'pear'];
  public options = this.optionsOriginal.slice();

  public removeChip(event: TsChipEvent): void {
    console.log('DEMO: remove chip: ', event);
    if (!event.chip.value) {
      return;
    }
    const index = this.options.indexOf(event.chip.value);
    if (index < 0) {
      return;
    }
    this.options.splice(index, 1);
  }

  public change(value: TsChipCollectionChange) {
    console.log('DEMO: collection change triggered: value: ', value);
  }

}
