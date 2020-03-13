import {
  CollectionViewer,
  DataSource,
} from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  configureTestBedWithoutReset,
  dispatchMouseEvent,
  wrappedErrorMessage,
} from '@terminus/ngx-tools/testing';
import { TsTableModule } from '@terminus/ui/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  getSortDuplicateSortableIdError,
  getSortHeaderMissingIdError,
  getSortHeaderNotContainedWithinSortError,
  getSortInvalidDirectionError,
} from './sort-errors';
import { TsSortHeaderComponent } from './sort-header.component';
import {
  TsSortDirection,
  TsSortDirective,
  TsSortState,
} from './sort.directive';
import { TsSortModule } from './sort.module';

/**
 * HELPERS
 */

/**
 * Performs a sequence of sorting on a single column to see if the sort directions are
 * consistent with expectations. Detects any changes in the fixture to reflect any changes in
 * the inputs and resets the TsSort to remove any side effects from previous tests.
 *
 * @param fixture
 * @param expectedSequence
 * @param id
 */
function testSingleColumnSortDirectionSequence(
  fixture: ComponentFixture<SimpleTsSortApp>,
  expectedSequence: TsSortDirection[],
  id = 'defaultSortHeaderA',
) {
  // Detect any changes that were made in preparation for this sort sequence
  fixture.detectChanges();

  // Reset the sort to make sure there are no side affects from previous tests
  const component = fixture.componentInstance;
  component.tsSort.active = '';
  component.tsSort.direction = '';

  // Run through the sequence to confirm the order
  const actualSequence = expectedSequence.map(() => {
    component.sort(id);

    // Check that the sort event's active sort is consistent with the TsSort
    expect(component.tsSort.active).toBe(id);
    expect(component.latestSortEvent.active).toBe(id);

    // Check that the sort event's direction is consistent with the TsSort
    expect(component.tsSort.direction).toBe(component.latestSortEvent.direction);
    return component.tsSort.direction;
  });
  expect(actualSequence).toEqual(expectedSequence);

  // Expect that performing one more sort will loop it back to the beginning.
  component.sort(id);
  expect(component.tsSort.direction).toBe(expectedSequence[0]);
}

@Component({
  template: `
    <div
      tsSort
      [tsSortActive]="active"
      [tsSortDisabled]="disableAllSort"
      [tsSortStart]="start"
      [tsSortDirection]="direction"
      [tsSortDisableClear]="disableClear"
      (tsSortChange)="latestSortEvent = $event"
    >
      <div
        id="defaultSortHeaderA"
        #defaultSortHeaderA
        ts-sort-header="defaultSortHeaderA"
        [disabled]="disabledColumnSort"
      >
        A
      </div>
      <div id="defaultSortHeaderB" #defaultSortHeaderB ts-sort-header="defaultSortHeaderB">
        B
      </div>
      <div id="overrideStart" ts-sort-header="overrideStart" start="desc"> D </div>
      <div id="overrideDisableClear" ts-sort-header="overrideDisableClear" disableClear> E </div>
    </div>
  `,
})
class SimpleTsSortApp {
  latestSortEvent!: TsSortState;

  active!: string;
  start: TsSortDirection = 'asc';
  direction: TsSortDirection = '';
  disableClear!: boolean;
  disabledColumnSort = false;
  disableAllSort = false;

  @ViewChild(TsSortDirective, { static: true })
  tsSort!: TsSortDirective;

  @ViewChild('defaultSortHeaderA', { static: true })
  tsSortHeaderDefaultA!: TsSortHeaderComponent;

  @ViewChild('defaultSortHeaderB', { static: true })
  tsSortHeaderDefaultB!: TsSortHeaderComponent;

  constructor(public elementRef: ElementRef) {}

  sort(id: string) {
    const sortElement = this.elementRef.nativeElement.querySelector(`#${id}`);
    const sortButton = sortElement.querySelector('.ts-sort-header-button');
    dispatchMouseEvent(sortButton, 'click');
  }
}

class FakeDataSource extends DataSource<any> {
  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return collectionViewer.viewChange.pipe(map(() => []));
  }
  disconnect() {}
}

@Component({
  template: `
    <cdk-table [dataSource]="dataSource" tsSort>
      <ng-container cdkColumnDef="column_a">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderA ts-sort-header> Column A </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.a }}</cdk-cell>
      </ng-container>
      <ng-container cdkColumnDef="column_b">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderB ts-sort-header> Column B </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.b }}</cdk-cell>
      </ng-container>
      <ng-container cdkColumnDef="column_c">
        <cdk-header-cell *cdkHeaderCellDef #sortHeaderC ts-sort-header> Column C </cdk-header-cell>
        <cdk-cell *cdkCellDef="let row">{{ row.c }}</cdk-cell>
      </ng-container>
      <cdk-header-row *cdkHeaderRowDef="columnsToRender"></cdk-header-row>
      <cdk-row *cdkRowDef="let row; columns: columnsToRender"></cdk-row>
    </cdk-table>
  `,
})
class CdkTableTsSortApp {
  @ViewChild(TsSortDirective, { static: true })
  tsSort!: TsSortDirective;

  dataSource = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
}

@Component({
  template: `
    <table ts-table [dataSource]="dataSource" tsSort>
      <ng-container tsColumnDef="column_a">
        <th ts-header-cell *tsHeaderCellDef #sortHeaderA ts-sort-header> Column A </th>
        <td ts-cell *tsCellDef="let row">{{ row.a }}</td>
      </ng-container>
      <ng-container tsColumnDef="column_b">
        <th ts-header-cell *tsHeaderCellDef #sortHeaderB ts-sort-header> Column B </th>
        <td ts-cell *tsCellDef="let row">{{ row.b }}</td>
      </ng-container>
      <ng-container tsColumnDef="column_c">
        <th ts-header-cell *tsHeaderCellDef #sortHeaderC ts-sort-header> Column C </th>
        <td ts-cell *tsCellDef="let row">{{ row.c }}</td>
      </ng-container>
      <tr ts-header-row *tsHeaderRowDef="columnsToRender"></tr>
      <tr ts-row *tsRowDef="let row; columns: columnsToRender"></tr>
    </table>
  `,
})
class TsTableTsSortApp {
  @ViewChild(TsSortDirective, { static: true })
  tsSort!: TsSortDirective;

  dataSource = new FakeDataSource();
  columnsToRender = ['column_a', 'column_b', 'column_c'];
}

@Component({ template: `<div ts-sort-header="a"> A </div>` })
class TsSortHeaderMissingTsSortApp { }

@Component({
  template: `
    <div tsSort>
      <div ts-sort-header="duplicateId"> A </div>
      <div ts-sort-header="duplicateId"> A </div>
    </div>
  `,
})
class TsSortDuplicateTsSortableIdsApp { }

@Component({
  template: `
    <div tsSort>
      <div ts-sort-header> A </div>
    </div>
  `,
})
class TsSortableMissingIdApp { }

@Component({
  template: `
    <div tsSort tsSortDirection="ascending">
      <div ts-sort-header="a"> A </div>
    </div>
  `,
})
class TsSortableInvalidDirection { }

/**
 * TESTS
 */

describe('TsSort', () => {
  let fixture: ComponentFixture<SimpleTsSortApp>;
  let component: SimpleTsSortApp;
  const moduleDefinition: TestModuleMetadata = {
    imports: [
      TsSortModule,
      TsTableModule,
      CdkTableModule,
      NoopAnimationsModule,
    ],
    declarations: [
      SimpleTsSortApp,
      CdkTableTsSortApp,
      TsTableTsSortApp,
      TsSortHeaderMissingTsSortApp,
      TsSortDuplicateTsSortableIdsApp,
      TsSortableMissingIdApp,
      TsSortableInvalidDirection,
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTsSortApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should have the sort headers register and deregister themselves', () => {
    const sortables = component.tsSort['sortables'];
    expect(sortables.size).toBe(4);
    expect(sortables.get('defaultSortHeaderA')).toBe(component.tsSortHeaderDefaultA);
    expect(sortables.get('defaultSortHeaderB')).toBe(component.tsSortHeaderDefaultB);

    fixture.destroy();
    expect(sortables.size).toBe(0);
  });

  test('should use the column definition if used within a cdk table', () => {
    const cdkTableTsSortAppFixture = TestBed.createComponent(CdkTableTsSortApp);
    const cdkTableTsSortAppComponent = cdkTableTsSortAppFixture.componentInstance;

    cdkTableTsSortAppFixture.detectChanges();
    cdkTableTsSortAppFixture.detectChanges();

    const sortables = cdkTableTsSortAppComponent.tsSort['sortables'];
    expect(sortables.size).toBe(3);
    expect(sortables.has('column_a')).toBe(true);
    expect(sortables.has('column_b')).toBe(true);
    expect(sortables.has('column_c')).toBe(true);
  });

  test('should use the column definition if used within an ts table', () => {
    const tsTableTsSortAppFixture = TestBed.createComponent(TsTableTsSortApp);
    const tsTableTsSortAppComponent = tsTableTsSortAppFixture.componentInstance;

    tsTableTsSortAppFixture.detectChanges();
    tsTableTsSortAppFixture.detectChanges();

    const sortables = tsTableTsSortAppComponent.tsSort['sortables'];
    expect(sortables.size).toBe(3);
    expect(sortables.has('column_a')).toBe(true);
    expect(sortables.has('column_b')).toBe(true);
    expect(sortables.has('column_c')).toBe(true);
  });

  test('should be able to cycle from asc -> desc from either start point', () => {
    component.disableClear = true;
    fixture.detectChanges();

    component.start = 'asc';
    testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc']);

    // Reverse directions
    component.start = 'desc';
    testSingleColumnSortDirectionSequence(fixture, ['desc', 'asc']);
  });

  test('should be able to cycle asc -> desc -> [none]', () => {
    component.start = 'asc';
    testSingleColumnSortDirectionSequence(fixture, ['asc', 'desc', '']);
  });

  test('should be able to cycle desc -> asc -> [none]', () => {
    component.start = 'desc';
    testSingleColumnSortDirectionSequence(fixture, ['desc', 'asc', '']);
  });

  test('should allow for the cycling the sort direction to be disabled per column', () => {
    const button = fixture.nativeElement.querySelector('#defaultSortHeaderA button');

    component.sort('defaultSortHeaderA');
    expect(component.tsSort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBeFalsy();

    component.disabledColumnSort = true;
    fixture.detectChanges();

    component.sort('defaultSortHeaderA');
    expect(component.tsSort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBe('true');
  });

  test('should allow for the cycling the sort direction to be disabled for all columns', () => {
    const button = fixture.nativeElement.querySelector('#defaultSortHeaderA button');

    component.sort('defaultSortHeaderA');
    expect(component.tsSort.active).toBe('defaultSortHeaderA');
    expect(component.tsSort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBeFalsy();

    component.disableAllSort = true;
    fixture.detectChanges();

    component.sort('defaultSortHeaderA');
    expect(component.tsSort.active).toBe('defaultSortHeaderA');
    expect(component.tsSort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBe('true');

    component.sort('defaultSortHeaderB');
    expect(component.tsSort.active).toBe('defaultSortHeaderA');
    expect(component.tsSort.direction).toBe('asc');
    expect(button.getAttribute('disabled')).toBe('true');
  });

  test('should reset sort direction when a different column is sorted', () => {
    component.sort('defaultSortHeaderA');
    expect(component.tsSort.active).toBe('defaultSortHeaderA');
    expect(component.tsSort.direction).toBe('asc');

    component.sort('defaultSortHeaderA');
    expect(component.tsSort.active).toBe('defaultSortHeaderA');
    expect(component.tsSort.direction).toBe('desc');

    component.sort('defaultSortHeaderB');
    expect(component.tsSort.active).toBe('defaultSortHeaderB');
    expect(component.tsSort.direction).toBe('asc');
  });

  test('should throw an error if an TsSortable is not contained within an TsSort directive', () => {
    expect(() => TestBed.createComponent(TsSortHeaderMissingTsSortApp).detectChanges())
      .toThrowError(wrappedErrorMessage(getSortHeaderNotContainedWithinSortError()));
  });

  test('should throw an error if two TsSortables have the same id', () => {
    expect(() => TestBed.createComponent(TsSortDuplicateTsSortableIdsApp).detectChanges())
      .toThrowError(wrappedErrorMessage(getSortDuplicateSortableIdError('duplicateId')));
  });

  test('should throw an error if an TsSortable is missing an id', () => {
    expect(() => TestBed.createComponent(TsSortableMissingIdApp).detectChanges())
      .toThrowError(wrappedErrorMessage(getSortHeaderMissingIdError()));
  });

  test('should throw an error if the provided direction is invalid', () => {
    expect(() => TestBed.createComponent(TsSortableInvalidDirection).detectChanges())
      .toThrowError(wrappedErrorMessage(getSortInvalidDirectionError('ascending')));
  });

  test('should allow let TsSortable override the default sort parameters', () => {
    testSingleColumnSortDirectionSequence(
      fixture, ['asc', 'desc', ''],
    );

    testSingleColumnSortDirectionSequence(
      fixture, ['desc', 'asc', ''], 'overrideStart',
    );

    testSingleColumnSortDirectionSequence(
      fixture, ['asc', 'desc'], 'overrideDisableClear',
    );
  });

  test('should apply the aria-labels to the button', () => {
    const button = fixture.nativeElement.querySelector('#defaultSortHeaderA button');
    expect(button.getAttribute('aria-label')).toBe('Change sorting for defaultSortHeaderA');
  });
});
