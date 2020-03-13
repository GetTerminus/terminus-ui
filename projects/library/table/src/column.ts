import { CdkColumnDef } from '@angular/cdk/table';
import {
  Directive,
  ElementRef,
  Input,
} from '@angular/core';


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
  /**
   * Define a unique name for this column
   */
  // NOTE: We must rename here so that the property matches the extended CdkColumnDef class
  @Input('tsColumnDef')
  public name!: string;

  /**
   * Define an alignment type for the cell.
   */
  @Input()
  public alignment: TsTableColumnAlignment | undefined;

  /**
   * Define if the column should stick to the start
   */
  @Input()
  public sticky = false;

  /**
   * Define if a column should stick to the end
   */
  @Input()
  public stickyEnd = false;


  constructor(
    public elementRef: ElementRef,
  ) {
    super();
  }

}
