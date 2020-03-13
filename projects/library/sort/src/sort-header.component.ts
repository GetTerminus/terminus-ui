// FIXME: Should refactor out all dangles and remove this rule:
/* eslint-disable no-underscore-dangle */
import { CdkColumnDef } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { CanDisable } from '@angular/material/core';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { isBoolean } from '@terminus/ngx-tools/type-guards';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import { merge } from 'rxjs';

import { tsSortAnimations } from './sort-animations';
import { getSortHeaderNotContainedWithinSortError } from './sort-errors';
import { TsSortHeaderIntl } from './sort-header-intl';
import {
  TsSortableItem,
  TsSortDirective,
} from './sort.directive';


/**
 * Applies sorting behavior (click to change sort) and styles to an element, including an
 * arrow to display the current sort direction.
 *
 * Must be provided with an id and contained within a parent TsSortDirective.
 *
 * If used on header cells in a CdkTable, it will automatically default its id from its containing
 * column definition.
 *
 * @example
 * <ts-header-cell *tsHeaderCellDef ts-sort-header>
 *              Created
 * </ts-header-cell>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/table</example-url>
 */
@Component({
  // NOTE: This component needs to be added to another component so we need a non-element selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ts-sort-header]',
  // tslint:enable: component-selector
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss'],
  host: {
    'class': 'ts-sortable',
    '[class.ts-sort-header-sorted]': '_isSorted()',
    '[class.ts-sort-header-disabled]': '_isDisabled()',
  },
  preserveWhitespaces: false,
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled'],
  animations: [
    tsSortAnimations.indicator,
    tsSortAnimations.leftPointer,
    tsSortAnimations.rightPointer,
    tsSortAnimations.indicatorToggle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsSortHeader',
})
export class TsSortHeaderComponent implements TsSortableItem, CanDisable, OnInit, OnDestroy  {
  public disabled = false;

  /**
   * ID of this sort header. If used within the context of a CdkColumnDef, this will default to
   * the column's name.
   */
  // NOTE(B$): Renaming input so that we can pull a value from the primary directive
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('ts-sort-header')
  public id!: string;

  /**
   * Sets the position of the arrow that displays when sorted
   */
  @Input()
  public arrowPosition: 'before' | 'after' = 'after';

  /**
   * Overrides the sort start value of the containing TsSort for this TsSortable
   */
  @Input()
  public start!: 'asc' | 'desc';

  /**
   * Overrides the disable clear value of the containing TsSort for this TsSortable
   *
   * @param value
   */
  @Input()
  public set disableClear(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      // eslint-disable-next-line no-console
      console.warn(`TsSortHeaderComponent: "disableClear" value is not a boolean. `
      + `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._disableClear = coerceBooleanProperty(value);
  }
  public get disableClear(): boolean {
    return this._disableClear;
  }
  // NOTE: Test failed due to empty string, so keep this until it's investigated.
  private _disableClear!: boolean;


  constructor(
    public _intl: TsSortHeaderIntl,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() public _sort: TsSortDirective,
    @Optional() public _cdkColumnDef: CdkColumnDef,
  ) {
    if (!_sort && isDevMode()) {
      throw getSortHeaderNotContainedWithinSortError();
    }
  }


  /**
   * Default to cdk column name
   */
  public ngOnInit(): void {
    // Mark directive for change detection after any of these changes
    // eslint-disable-next-line deprecation/deprecation
    merge(this._sort.sortChange, this._sort._stateChanges, this._intl.changes)
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => this.changeDetectorRef.markForCheck());

    if (!this.id && this._cdkColumnDef) {
      this.id = this._cdkColumnDef.name;
    }

    this._sort.register(this);
  }

  /**
   * Deregister sort and unsubscribe from observables
   */
  public ngOnDestroy(): void {
    this._sort.deregister(this);
  }

  /**
   * Handles click events on the header
   */
  public _handleClick() {
    if (!this._isDisabled()) {
      this._sort.sort(this);
    }
  }

  /**
   * Whether this TsSortHeader is currently sorted in either ascending or descending order
   */
  public _isSorted() {
    return this._sort.active === this.id
        && (this._sort.direction === 'asc' || this._sort.direction === 'desc');
  }

  /**
   * Whether this TsSortHeader is disabled
   */
  public _isDisabled() {
    return this._sort.disabled || this.disabled;
  }
}
