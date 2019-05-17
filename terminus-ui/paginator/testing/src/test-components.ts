// tslint:disable: component-class-suffix
import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsMenuModule } from '@terminus/ui/menu';
import {
  TsPaginatorComponent,
  TsPaginatorModule,
} from '@terminus/ui/paginator';
import { TsSelectModule } from '@terminus/ui/select';


@Component({
  template: `
  <ts-paginator></ts-paginator>
  `,
})
export class Basic {
  @ViewChild(TsPaginatorComponent)
  paginatorComponent: TsPaginatorComponent;
}


@Component({
  template: `
  <ts-paginator
    [recordsPerPageChoices]="recordsPerPageChoices"
    [showRecordsPerPageSelector]="showRecordsPerPageSelector"
    [totalRecords]="totalRecords"
    [isZeroBased]="zeroBased"
  ></ts-paginator>
  `,
})
export class RecordsPerPage {
  showRecordsPerPageSelector = true;
  recordsPerPageChoices = [10, 20, 50];
  totalRecords = 100;
  zeroBased = true;

  @ViewChild(TsPaginatorComponent)
  paginatorComponent!: TsPaginatorComponent;
}


@Component({
  template: `
  <ts-paginator
    [maxPreferredRecords]="maxPreferredRecords"
    [recordCountTooHighMessage]="recordCountTooHighMessage"
    [totalRecords]="totalRecords"
  ></ts-paginator>
  `,
})
export class RecordsCount {
  maxPreferredRecords = 50;
  recordCountTooHighMessage = 'Too many records';
  totalRecords = 100;

  @ViewChild(TsPaginatorComponent)
  paginatorComponent!: TsPaginatorComponent;
}


@Component({
  template: `
  <ts-paginator
    [isZeroBased]="isZeroBased"
    [totalRecords]="totalRecords"
  ></ts-paginator>
  `,
})
export class ZeroBased {
  isZeroBased: boolean | undefined;
  totalRecords = 100;

  @ViewChild(TsPaginatorComponent)
  paginatorComponent!: TsPaginatorComponent;
}


/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    TsPaginatorModule,
  ],
  declarations: [
    Basic,
    RecordsCount,
    RecordsPerPage,
    ZeroBased,
  ],
})
export class TsPaginatorTestComponentsModule {}
