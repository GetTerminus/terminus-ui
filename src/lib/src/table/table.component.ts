import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  CDK_TABLE_TEMPLATE,
  CdkTable,
} from '@angular/cdk/table';


/**
 * Wrapper for the CdkTable with Material design styles.
 */
@Component({
  selector: 'ts-table',
  exportAs: 'tsTable',
  template: CDK_TABLE_TEMPLATE,
  styleUrls: ['./table.component.scss'],
  host: {
    class: 'ts-table',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsTableComponent<T> extends CdkTable<T> { }
