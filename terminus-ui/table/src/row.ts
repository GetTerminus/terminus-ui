import {
  CDK_ROW_TEMPLATE,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
} from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

import { TsTableComponent } from './table.component';


/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
@Component({
  selector: 'ts-header-row',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'ts-header-row',
    role: 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsHeaderRow',
  preserveWhitespaces: false,
})
export class TsHeaderRowComponent extends CdkHeaderRow {
  constructor(
    public elementRef: ElementRef,
  ) {
    super();
  }
}


/**
 * Data row template container that contains the cell outlet. Adds the right class and role.
 */
@Component({
  selector: 'ts-row',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'ts-row',
    role: 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsRow',
  preserveWhitespaces: false,
})
export class TsRowComponent extends CdkRow {
  constructor(
    public elementRef: ElementRef,
  ) {
    super();
  }
}

/**
 * Header row definition for the {@link TsTableComponent}.
 *
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[tsHeaderRowDef]',
  providers: [
    {
      provide: CdkHeaderRowDef,
      useExisting: TsHeaderRowDefDirective,
    },
    {
      provide: CdkHeaderRow,
      useExisting: TsHeaderRowComponent,
    },
  ],
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: [
    'columns: tsHeaderRowDef',
    'sticky: tsHeaderRowDefSticky',
  ],
})
export class TsHeaderRowDefDirective extends CdkHeaderRowDef {}


/**
 * Data row definition for the {@link TsTableComponent}.
 *
 * Captures the header row's template and other row properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[tsRowDef]',
  providers: [
    {
      provide: CdkRowDef,
      useExisting: TsRowDefDirective,
    },
    {
      provide: CdkRow,
      useExisting: TsRowComponent,
    },
  ],
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: [
    'columns: tsRowDefColumns',
    'when: tsRowDefWhen',
  ],
})
export class TsRowDefDirective<T> extends CdkRowDef<T> {}
