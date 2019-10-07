// NOTE: In this case, we want an actual selector (so content can be nested inside) for our directive. So we are disabling the
// `directive-selector` rule
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
  Host,
  Input,
  isDevMode,
  Optional,
  Renderer2,
  SkipSelf,
} from '@angular/core';
import { TsUILibraryError } from '@terminus/ui/utilities';

import { TsTableComponent } from './table.component';


/**
 * Allowed column alignments
 */
export type TsTableColumnAlignment
  = 'left'
  | 'center'
  | 'right'
;

/**
 * An array of the allowed {@link TsTableColumnAlignment} for checking values
 */
export const tsTableColumnAlignmentTypesArray: TsTableColumnAlignment[] = [
  'left',
  'center',
  'right',
];


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
    public columnDef: CdkColumnDef,
    public renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() @Host() @SkipSelf() parent: TsTableComponent<unknown>,
  ) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);

    // tslint:disable-next-line no-any
    const column: any = columnDef;

    if (parent.columns) {
      const width = parent.columns.filter(c => c.name === columnDef.name).map(v => v.width)[0];
      // istanbul ignore else
      if (width) {
        renderer.setStyle(elementRef.nativeElement, 'flex-basis', width);
      }
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
  public column: TsColumnDefDirective;

  constructor(
    private columnDef: CdkColumnDef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() @Host() @SkipSelf() parent: TsTableComponent<unknown>,
  ) {
    super(columnDef, elementRef);
    // NOTE: Changing the type in the constructor from `CdkColumnDef` to `TsColumnDefDirective` doesn't seem to play well with the CDK.
    // Coercing the type here is a hack, but allows us to reference properties that do not exist on the underlying `CdkColumnDef`.
    this.column = columnDef as TsColumnDefDirective;

    // Set a custom class for each column
    elementRef.nativeElement.classList.add(`ts-column-${columnDef.cssClassFriendlyName}`);

    // Set the no-wrap class if needed
    if (this.column.noWrap) {
      elementRef.nativeElement.classList.add(`ts-column-no-wrap`);
    }

    TsCellDirective.setColumnAlignment(this.column, renderer, elementRef);

    if (parent.columns) {
      const width = parent.columns.filter(c => c.name === columnDef.name).map(v => v.width)[0];
      // istanbul ignore else
      if (width) {
        renderer.setStyle(elementRef.nativeElement, 'flex-basis', width);
      }
    }

    // eslint-disable-next-line no-underscore-dangle
    if (columnDef._stickyEnd) {
      elementRef.nativeElement.classList.add(`ts-cell--sticky-end`);
    }
  }


  /**
   * Set the column alignment styles
   *
   * @param column - The column definition
   * @param renderer - The Renderer2
   * @param elementRef - The element ref to add the class to
   */
  private static setColumnAlignment(column: TsColumnDefDirective, renderer: Renderer2, elementRef: ElementRef): void {
    if (column.alignment) {
      // Verify the alignment value is allowed
      if (tsTableColumnAlignmentTypesArray.indexOf(column.alignment) < 0 && isDevMode()) {
        throw new TsUILibraryError(`TsCellDirective: "${column.alignment}" is not an allowed alignment.`
          + `See "TsTableColumnAlignment" type for available options.`);
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
    {
      provide: 'MAT_SORT_HEADER_COLUMN_DEF',
      useExisting: TsColumnDefDirective,
    },
  ],
})
export class TsColumnDefDirective extends CdkColumnDef {
  // NOTE: We must rename here so that the property matches the extended CdkColumnDef class
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
