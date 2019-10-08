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
  ViewEncapsulation,
} from '@angular/core';


/**
 * Header row definition for the {@link TsTableComponent}.
 *
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[tsHeaderRowDef]',
  providers: [{
    provide: CdkHeaderRowDef,
    useExisting: TsHeaderRowDefDirective,
  }],
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['columns: tsHeaderRowDef'],
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
  providers: [{
    provide: CdkRowDef,
    useExisting: TsRowDefDirective,
  }],
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: [
    'columns: tsRowDefColumns',
    'when: tsRowDefWhen',
  ],
})
export class TsRowDefDirective<T> extends CdkRowDef<T> {}


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
export class TsHeaderRowComponent extends CdkHeaderRow {}


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
export class TsRowComponent extends CdkRow {}
