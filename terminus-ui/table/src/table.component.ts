import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CdkTable } from '@angular/cdk/table';


/**
 * Wrapper for the CdkTable with Material design styles.
 *
 * @example
 *  <ts-table [dataSource]="dataSource" tsSort>
 *    <ng-container tsColumnDef="title">
 *      <ts-header-cell *tsHeaderCellDef>
 *        Title
 *      </ts-header-cell>
 *      <ts-cell *tsCellDef="let item">
 *        {{ item.title }}
 *      </ts-cell>
 *    </ng-container>
 *
 *    <ng-container tsColumnDef="id">
 *      <ts-header-cell *tsHeaderCellDef>
 *        ID
 *      </ts-header-cell>
 *      <ts-cell *tsCellDef="let item">
 *        {{ item.id }},
 *      </ts-cell>
 *    </ng-container>
 *
 *    <ts-header-row *tsHeaderRowDef="displayedColumns">
 *    </ts-header-row>
 *
 *    <ts-row *tsRowDef="let row; columns: displayedColumns;">
 *    </ts-row>
 *  </ts-table>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/table</example-url>
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
