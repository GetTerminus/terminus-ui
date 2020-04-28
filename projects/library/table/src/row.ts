import {
  CDK_ROW_TEMPLATE,
  CdkFooterRow,
  CdkFooterRowDef,
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


/**
 * Header template container that contains the cell outlet. Adds the right class and role.
 */
@Component({
  selector: 'ts-header-row, tr[ts-header-row]',
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
  selector: 'ts-row, tr[ts-row]',
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
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'columns: tsHeaderRowDef',
    'sticky: tsHeaderRowDefSticky',
  ],
})
export class TsHeaderRowDefDirective extends CdkHeaderRowDef {}

/**
 * Footer row definition for the {@link TsTableComponent}.
 *
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
  selector: '[tsFooterRowDef]',
  providers: [{
    provide: CdkFooterRowDef,
    useExisting: TsFooterRowDefDirective,
  }],
  // NOTE: @Inputs are defined here rather than using decorators since we are extending the @Inputs of the base class
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'columns: tsFooterRowDef',
    'sticky: tsFooterRowDefSticky',
  ],
})
export class TsFooterRowDefDirective extends CdkFooterRowDef {}

/**
 * Footer template container that contains the cell outlet. Adds the right class and role.
 */
@Component({
  selector: 'ts-footer-row, tr[ts-footer-row]',
  template: CDK_ROW_TEMPLATE,
  host: {
    class: 'ts-footer-row',
    role: 'row',
  },
  providers: [{
    provide: CdkFooterRow,
    useExisting: TsFooterRowComponent,
  }],
  // See note on CdkTable for explanation on why this uses the default change detection strategy.
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsFooterRow',
})
export class TsFooterRowComponent extends CdkFooterRow {}

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
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [
    'columns: tsRowDefColumns',
    'when: tsRowDefWhen',
  ],
})
export class TsRowDefDirective<T> extends CdkRowDef<T> {}
