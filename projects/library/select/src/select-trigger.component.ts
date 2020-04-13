import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';


// Unique ID for each instance
let nextUniqueId = 0;


/**
 * Allows the user to customize the trigger that is displayed when the select has a value.
 *
 * @deprecated Please use `TsSelectionListTriggerDirective`
 */
@Component({
  selector: 'ts-select-trigger',
  template: `<ng-content></ng-content>`,
  host: {
    'class': 'ts-select-custom-trigger qa-select-custom-trigger',
    '[attr.id]': 'id',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSelectTrigger',
})
export class TsSelectTriggerComponent {
  /**
   * Define the default component ID
   */
  public readonly uid = `ts-select-trigger-${nextUniqueId++}`;

  /**
   * Define an ID for the component
   *
   * @param value
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;
}
