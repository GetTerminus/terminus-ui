// NOTE(B$): In this case, we want an actual selector (so content can be nested inside) for our
// directive. So we are disabling the `directive-selector` rule
// tslint:disable: directive-selector
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';
import {
  Directive,
  ElementRef,
  Input,
  isDevMode,
  Renderer2,
} from '@angular/core';

export type TsTableColumnAlignment
  = 'left'
  | 'center'
  | 'right'
;

/**
 * An array of the allowed {@link TsTableColumnAlignment} for checking values
 */
export const tsTableColumnAlignmentTypesArray: TsTableColumnAlignment[] = ['left', 'center', 'right'];


/**
 * Cell definition for the {@link TsTableComponent}.
 *
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[tsCellDef]',
  providers: [{
    provide: CdkCellDef,
    useExisting: TsCellDefDirective,
  }],
})
export class TsCellDefDirective extends CdkCellDef {}


/**
 * Header cell definition for the {@link TsTableComponent}.
 *
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[tsHeaderCellDef]',
  providers: [{
    provide: CdkHeaderCellDef,
    useExisting: TsHeaderCellDefDirective,
  }],
})
export class TsHeaderCellDefDirective extends CdkHeaderCellDef {}



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
  constructor(
    columnDef: CdkColumnDef,
    elementRef: ElementRef,
    public renderer: Renderer2,
  ) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);

    // tslint:disable-next-line no-any
    const column: any = columnDef;

    // Set inline style for min-width if passed in
    if (column.minWidth) {
      renderer.setStyle(elementRef.nativeElement, 'flex-basis', column.minWidth);
    }
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
    public renderer: Renderer2,
  ) {
    super(columnDef, elementRef);

    // NOTE: We are adding `noWrap` to the column in `TsColumnDefDirective` which doesn't exist
    // in the `CdkColumnDef` so we cast it to 'any'.
    // tslint:disable-next-line no-any
    const column: any = columnDef;

    // Set a custom class for each column
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);

    // Set the no-wrap class if needed
    if (column.noWrap) {
      elementRef.nativeElement.classList.add(`ts-column-no-wrap`);
    }

    // Set inline style for min-width if passed in
    if (column.minWidth) {
      renderer.setStyle(elementRef.nativeElement, 'flex-basis', column.minWidth);
    }

    // Skip the following in or to maintain backward compatibility with cells that do not use alignment
    if (column.alignment) {
      // Verify the alignment value is allowed
      if (tsTableColumnAlignmentTypesArray.indexOf(column.alignment) < 0 && isDevMode()) {
        console.warn(`TsCellDirective: "${column.alignment}" is not an allowed alignment. `
        + `See TsTableColumnAlignment for available options.`);
        return;
      }

      // Set inline style for text-align
      renderer.setStyle(elementRef.nativeElement, 'textAlign', column.alignment);
    }
  }
}


/**
 * Column definition for the {@link TsTableComponent}.
 *
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[tsColumnDef]',
  providers: [
    {
      provide: CdkColumnDef,
      useExisting: TsColumnDefDirective,
    },
  ],
})
export class TsColumnDefDirective extends CdkColumnDef {
  // NOTE(B$): We must rename here so that the property matches the extended CdkColumnDef class
  // tslint:disable: no-input-rename
  /**
   * Define a unique name for this column
   */
  @Input('tsColumnDef')
  public name!: string;
  // tslint:enable: no-input-rename

  /**
   * Define if a column's contents should wrap when long
   */
  @Input()
  public noWrap = false;

  /**
   * Define a minimum width for the column
   */
  @Input()
  public minWidth: string | undefined;

  /**
   * Define an alignment type for the cell.
   */
  @Input()
  public alignment: TsTableColumnAlignment | undefined;

  /**
   * Define stickiness for the column
   */
  @Input()
  public sticky = false;

  /**
   * Define if a column should stick to the end
   */
  @Input()
  public stickyEnd = false;
}
