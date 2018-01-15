// NOTE(B$): In this case, we want an actual selector (so content can be nested inside) for our
// directive. So we are disabling the `directive-selector` rule
// tslint:disable: directive-selector
import {
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';


/**
 * Cell definition for the {@link TsTableComponent}.
 *
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[tsCellDef]',
  providers: [{provide: CdkCellDef, useExisting: TsCellDefDirective}],
})
export class TsCellDefDirective extends CdkCellDef {}


/**
 * Header cell definition for the {@link TsTableComponent}.
 *
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[tsHeaderCellDef]',
  providers: [{provide: CdkHeaderCellDef, useExisting: TsHeaderCellDefDirective}],
})
export class TsHeaderCellDefDirective extends CdkHeaderCellDef {}


/**
 * Column definition for the {@link TsTableComponent}.
 *
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[tsColumnDef]',
  providers: [{provide: CdkColumnDef, useExisting: TsColumnDefDirective}],
})
export class TsColumnDefDirective extends CdkColumnDef {
  // NOTE(B$): We must rename here so that the property matches the extended class
  // tslint:disable: no-input-rename
  /**
   * Define a unique name for this column
   */
  @Input('tsColumnDef')
  name: string;
  // tslint:enable: no-input-rename
}


/**
 * Header cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'ts-header-cell',
  host: {
    class: 'ts-header-cell',
    role: 'columnheader',
  },
})
export class TsHeaderCellDirective extends CdkHeaderCell {
  constructor(columnDef: CdkColumnDef, elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);
  }
}


/**
 * Cell template container that adds the right classes and role.
 */
@Directive({
  selector: 'ts-cell',
  host: {
    class: 'ts-cell',
    role: 'gridcell',
  },
})
export class TsCellDirective extends CdkCell {
  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef,
  ) {
    super(columnDef, elementRef);

    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);
  }
}
