/* eslint-disable no-underscore-dangle */
import { ComponentFixture } from '@angular/core/testing';
import { createComponent } from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/table/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  expectTableToMatchContent,
  getHeaderCells,
  getHeaderRow,
} from '@terminus/ui/table/testing';

import { TsTableDataSource } from './table-data-source';
import { TsTableModule } from './table.module';




describe(`TsTableComponent`, function() {

  describe(`with basic data source`, function() {

    test(`should be able to create a table with the right content and without when row`, function() {
      const fixture = createComponent(testComponents.TableApp, [], [TsTableModule]);
      fixture.detectChanges();

      const tableElement = fixture.nativeElement.querySelector('.ts-table');
      const data = fixture.componentInstance.dataSource.data;
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        [data[0].a, data[0].b, data[0].c],
        [data[1].a, data[1].b, data[1].c],
        [data[2].a, data[2].b, data[2].c],
        ['fourth_row'],
      ]);
    });


    test(`should create a table with special when row`, function() {
      const fixture = createComponent(testComponents.TableWithWhenRowApp, [], [TsTableModule]);
      fixture.detectChanges();

      const tableElement = document.querySelector('.ts-table');
      expectTableToMatchContent(tableElement!, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1'],
        ['a_2'],
        ['a_3'],
        ['fourth_row'],
      ]);
    });
  });


  describe(`with TsTableDataSource`, function() {
    let tableElement: HTMLElement;
    let fixture: ComponentFixture<testComponents.ArrayDataSourceTableApp>;
    let dataSource: TsTableDataSource<TestData>;
    let component: testComponents.ArrayDataSourceTableApp;

    beforeEach(() => {
      fixture = createComponent(testComponents.ArrayDataSourceTableApp, [], [TsTableModule]);
      fixture.detectChanges();

      tableElement = fixture.nativeElement.querySelector('.ts-table');
      component = fixture.componentInstance;
      dataSource = fixture.componentInstance.dataSource;
    });


    test(`should create table and display data source contents`, function() {
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1', 'b_1', 'c_1'],
        ['a_2', 'b_2', 'c_2'],
        ['a_3', 'b_3', 'c_3'],
      ]);
    });


    test(`changing data should update the table contents`, function() {
      // Add data
      component.underlyingDataSource.addData();
      fixture.detectChanges();
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_1', 'b_1', 'c_1'],
        ['a_2', 'b_2', 'c_2'],
        ['a_3', 'b_3', 'c_3'],
        ['a_4', 'b_4', 'c_4'],
      ]);

      // Remove data
      const modifiedData = dataSource.data.slice();
      modifiedData.shift();
      dataSource.data = modifiedData;
      fixture.detectChanges();
      expectTableToMatchContent(tableElement, [
        ['Column A', 'Column B', 'Column C'],
        ['a_2', 'b_2', 'c_2'],
        ['a_3', 'b_3', 'c_3'],
        ['a_4', 'b_4', 'c_4'],
      ]);
    });


    test(`should add the no wrap class`, function() {
      const noWrapColumn = fixture.nativeElement.querySelector('.ts-column-no-wrap');

      expect(noWrapColumn).toBeTruthy();
    });


    test(`should add the min-width style`, function() {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_b');
      const headerColumn = fixture.nativeElement.querySelector('.ts-header-cell.ts-column-column_b');

      let style;
      let headerStyle;
      if (column.style && column.style._values) {
        style = column.style._values['flex-basis'];
        headerStyle = headerColumn.style._values['flex-basis'];
      }

      expect(style).toEqual('100px');
      expect(headerStyle).toEqual('100px');
    });

  });


  describe(`table column alignment`, () => {
    let fixture: ComponentFixture<testComponents.TableColumnAlignmentTableApp>;

    beforeEach(() => {
      fixture = createComponent(testComponents.TableColumnAlignmentTableApp, [], [TsTableModule]);
      fixture.detectChanges();
    });

    test(`should add the text-align style and set value to left`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_a');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['text-align'];
      }

      expect(style).toEqual('left');
    });

    test(`should NOT add the text-align style if alignment is not provided`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_b');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['text-align'];
      }

      expect(style).toBeUndefined();
    });

    test(`should NOT add the text-align style if alignment is not a valid alignment`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_c');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['text-align'];
      }

      expect(style).toBeUndefined();
    });

  });


  describe(`invalid alignment argument`, () => {

    test(`should throw warning`, () => {
      window.console.warn = jest.fn();
      const fixture = createComponent(testComponents.TableColumnInvalidAlignmentTableApp, [], [TsTableModule]);
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
    });

  });


  describe(`pinned header and column`, () => {
    let fixture: ComponentFixture<testComponents.PinnedTableHeaderColumn>;
    let tableElement: HTMLElement;

    beforeEach(() => {
      fixture = createComponent(testComponents.PinnedTableHeaderColumn, [], [TsTableModule]);
      fixture.detectChanges();

      tableElement = fixture.nativeElement.querySelector('.ts-table');
    });

    test(`should set a header to be sticky`, () => {
      const header = getHeaderRow(tableElement);
      expect(header.classList).toContain('ts-table--sticky');
    });

    test(`should set a column to be sticky`, () => {
      const headerCells = getHeaderCells(tableElement);
      expect(headerCells[0].classList).toContain('ts-table--sticky');
      expect(headerCells[1].classList).not.toContain('ts-table--sticky');
    });

  });

});

