import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import {
  CdkTable,
} from '@angular/cdk/table';


/**
 * Wrapper for the CdkTable with Material design styles.
 */
@Component({
  selector: 'ts-table',
  template: `
    <div class="ts-table__container">
      <div class="ts-table__table">
        <ng-container headerRowOutlet></ng-container>
        <ng-container rowOutlet></ng-container>
        <ng-container footerRowOutlet></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./table.component.scss'],
  host: {
    class: 'ts-table',
  },
  exportAs: 'tsTable',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsTableComponent<T> extends CdkTable<T> { }
