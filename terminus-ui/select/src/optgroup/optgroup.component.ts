import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  Optional,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TsCheckboxComponent } from '@terminus/ui/checkbox';

import {
  allOptionsAreSelected,
  someOptionsAreSelected,
  toggleAllOptions,
} from './../option/option-utilities';
import {
  TS_OPTGROUP_PARENT_COMPONENT,
  TS_OPTION_PARENT_COMPONENT,
  TsOptionParentComponent,
  TsSelectOptionComponent,
} from './../option/option.component';


// Unique ID for each instance
let nextUniqueId = 0;


/**
 * Component that is used to group instances of {@link TsSelectOptionComponent}s
 *
 * #### QA CSS CLASSES
 * - `qa-optgroup-label`: The group label
 * - `qa-optgroup-checkbox`: The group checkbox
 *
 * @example
 * <ts-select-optgroup
 *              id="my-id"
 *              [isDisabled]="true"
 *              label="My optgroup"
 * ></ts-select-optgroup>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-select-optgroup',
  templateUrl: 'optgroup.component.html',
  styleUrls: ['optgroup.component.scss'],
  host: {
    class: 'ts-optgroup',
    role: 'group',
    '[class.ts-optgroup--disabled]': 'isDisabled',
    '[attr.id]': 'id',
    '[attr.aria-disabled]': '!!isDisabled',
    '[attr.aria-labelledby]': 'labelId',
  },
  providers: [
    {
      provide: TS_OPTGROUP_PARENT_COMPONENT,
      useExisting: TsSelectOptgroupComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'tsSelectOptgroup',
})
export class TsSelectOptgroupComponent {
  /**
   * A flag signifying all child options are selected
   */
  public allSelected = false;

  /**
   * Unique id for the underlying label
   */
  public labelId = `ts-select-optgroup-label-${nextUniqueId++}`;

  /**
   * A flag signifying some of the child options are selected
   */
  public someSelected = false;

  /**
   * Define the default component ID
   */
  protected uid = `ts-select-optgroup-${nextUniqueId++}`;

  /**
   * VIEW ACCESS
   */

  /**
   * Access the checkbox instance
   */
  @ViewChild(TsCheckboxComponent)
  public checkbox!: TsCheckboxComponent;

  /**
   * Access the list of options
   */
  @ContentChildren(TsSelectOptionComponent)
  public optgroupOptions!: QueryList<TsSelectOptionComponent>;

  /**
   * INPUTS
   */

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this.uid;

  /**
   * Define if the group is disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Label for the option group
   */
  @Input()
  public label: string | undefined;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    // NOTE: Useful for testing
    // tslint:disable-next-line
    private elementRef: ElementRef,
    @Optional() @Inject(TS_OPTION_PARENT_COMPONENT) public parent: TsOptionParentComponent,
  ) {}


  /**
   * Toggle all options
   */
  public toggle(): void {
    // istanbul ignore else
    if (!this.isDisabled && this.parent.allowMultiple) {
      toggleAllOptions(this.optgroupOptions);
    }
  }


  /**
   * Allow others to trigger count updates and CDR detection
   */
  public triggerChangeDetection(): void {
    this.allSelected = allOptionsAreSelected(this.optgroupOptions);
    this.someSelected = someOptionsAreSelected(this.optgroupOptions);
    this.changeDetectorRef.detectChanges();
  }

}
