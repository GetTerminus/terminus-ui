import {
  Component,
  NgModule,
  ViewChild,
} from '@angular/core';
import {
  TsPaginatorComponent,
  TsPaginatorModule,
} from '@terminus/ui/paginator';


@Component({ template: `<ts-paginator></ts-paginator>` })
export class Basic {
  @ViewChild(TsPaginatorComponent, { static: true })
  public paginatorComponent!: TsPaginatorComponent;
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
  public showRecordsPerPageSelector = true;
  public recordsPerPageChoices = [10, 20, 50];
  public totalRecords = 100;
  public zeroBased = true;
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
  public maxPreferredRecords = 50;
  public recordCountTooHighMessage = 'Too many records';
  public totalRecords = 100;
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
  public isZeroBased: boolean | undefined;
  public totalRecords = 100;
}

@Component({
  template: `
      <ts-paginator
        [isSimpleMode]="isSimple"
        [totalRecords]="totalRecords"
      ></ts-paginator>
  `,
})
export class SimpleMode {
  public isSimple = true;
  public totalRecords = 100;
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
    SimpleMode,
    ZeroBased,
  ],
})
export class TsPaginatorTestComponentsModule {}
