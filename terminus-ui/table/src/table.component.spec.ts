/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TsWindowService } from '@terminus/ngx-tools/browser';
import {
  createComponent,
  createMouseEvent,
  ElementRefMock,
  Renderer2Mock,
} from '@terminus/ngx-tools/testing';
import { noop } from '@terminus/ngx-tools/utilities';
import * as testComponents from '@terminus/ui/table/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  expectTableToMatchContent,
  getCells, getColumnElements,
  getHeaderCells,
  getHeaderRow,
} from '@terminus/ui/table/testing';

import {
  TsCellDirective, TsHeaderCellDirective,
} from './cell';
import { TsColumnDefDirective } from './column';
import { TsTableDataSource } from './table-data-source';
import { TsTableModule } from './table.module';


@Injectable({ providedIn: 'root' })
export class TsWindowServiceMock {
  public styleObject: CSSStyleDeclaration = { width: '90px' } as any;

  public get nativeWindow(): Window {
    return {
      getComputedStyle: e => this.styleObject,
      open: noop,
      location: {
        href: 'foo/bar',
        protocol: 'https:',
      },
      alert: noop,
      getSelection: () => ({
        removeAllRanges: noop,
        addRange: noop,
      }),
      scrollTo: (x: number, y: number) => {
      },
      prompt: noop,
    } as any;
  }

}

interface TestData {
  a: string|number|undefined;
  b: string|number|undefined;
  c: string|number|undefined;
}


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
      fixture.detectChanges();
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_b');
      const headerColumn = fixture.nativeElement.querySelector('.ts-header-cell.ts-column-column_b');

      let style;
      let headerStyle;
      if (column.style && column.style._values) {
        style = column.style._values['max-width'];
        headerStyle = headerColumn.style._values['max-width'];
      }

      expect(style).toEqual('1000px');
      expect(headerStyle).toEqual('1000px');
    });

  });

  describe(`table column alignment`, () => {
    let fixture: ComponentFixture<testComponents.TableColumnAlignmentTableApp>;

    beforeEach(() => {
      fixture = createComponent(testComponents.TableColumnAlignmentTableApp, [], [TsTableModule]);
      fixture.detectChanges();
    });

    test(`should add the text-align class`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_a');

      expect(column.classList).toContain('ts-cell--align-right');
    });

    test(`should NOT add the text-align style if alignment is not provided`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_b');

      expect(column.classList).not.toContain('ts-cell--align-right');
    });

    test(`should NOT add the text-align style if alignment is not a valid alignment`, () => {
      const column = fixture.nativeElement.querySelector('.ts-cell.ts-column-column_c');

      let style;
      if (column.style && column.style._values) {
        style = column.style._values['text-align'];
      }

      expect(style).toBeUndefined();
    });

    test(`should throw error for invalid alignment arguments`, () => {
      const col = new TsColumnDefDirective(new ElementRefMock());
      Object.defineProperties(col, { alignment: { get: () => 'foo' } });

      const actual = () => {
        const test = new TsCellDirective(new ElementRefMock(), col, new Renderer2Mock());
      };

      expect(actual).toThrowError('TsCellDirective: ');
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
      const cells = getCells(tableElement);
      expect(headerCells[0].classList).toContain('ts-table--sticky');
      expect(headerCells[1].classList).not.toContain('ts-table--sticky');
      expect(cells[0].classList).not.toContain('ts-table--sticky-end');
      expect(cells[2].classList).toContain('ts-table--sticky-end');
    });

  });

  describe(`resizable columns`, () => {

    test(`should reveal the 'grabber' when the header cell resize is hovered`, () => {
      const fixture = createComponent(testComponents.TableApp, undefined, [TsTableModule]);
      fixture.detectChanges();
      const tableElement = fixture.nativeElement.querySelector('.ts-table');
      const headerCells = getHeaderCells(tableElement);
      fixture.detectChanges();

      expect(headerCells[0].classList).not.toContain('ts-cell--resizing');

      const firstResizer = headerCells[0].querySelector('.ts-header-cell__resizer')!;
      const hoverEvent = createMouseEvent('mouseenter');
      firstResizer.dispatchEvent(hoverEvent);
      fixture.detectChanges();
      const columnElements = getColumnElements('column_a', tableElement);

      for (const col of columnElements) {
        expect(col.classList).toContain('ts-cell--resizing');
      }

      const hoverEndEvent = createMouseEvent('mouseleave');
      firstResizer.dispatchEvent(hoverEndEvent);
      fixture.detectChanges();

      for (const col of columnElements) {
        expect(col.classList).not.toContain('ts-cell--resizing');
      }

      expect.assertions(9);
    });

    test(`should allow column resizing and emit the updated columns`, () => {
      const fixture = createComponent(testComponents.TableApp, [{
        provide: TsWindowService,
        useExisting: TsWindowServiceMock,
      }], [TsTableModule]);
      fixture.detectChanges();
      const tableElement = fixture.nativeElement.querySelector('.ts-table');
      const headerCells = getHeaderCells(tableElement);
      fixture.detectChanges();
      const firstResizer = headerCells[0].querySelector('.ts-header-cell__resizer')!;

      fixture.componentInstance.columnsChanged = jest.fn();

      const mousedownEvent = createMouseEvent('mousedown');
      Object.defineProperties(mousedownEvent, { clientX: { get: () => '300' } });
      firstResizer.dispatchEvent(mousedownEvent);
      fixture.detectChanges();

      const mousemoveEvent = createMouseEvent('mousemove');
      Object.defineProperties(mousemoveEvent, { clientX: { get: () => '280' } });
      document.dispatchEvent(mousemoveEvent);
      fixture.detectChanges();

      const mouseupEvent = createMouseEvent('mouseup');
      document.dispatchEvent(mouseupEvent);
      fixture.detectChanges();
      fixture.detectChanges();

      expect(fixture.componentInstance.columnsChanged).toHaveBeenCalled();
    });

    test(`should stop click propagation so sorting isn't triggered`, () => {
      const fixture = createComponent(testComponents.TableApp, undefined, [TsTableModule]);
      fixture.detectChanges();
      const tableElement = fixture.nativeElement.querySelector('.ts-table');
      const headerCells = getHeaderCells(tableElement);
      fixture.detectChanges();
      const firstResizer = headerCells[0].querySelector('.ts-header-cell__resizer')!;
      const clickEvent = createMouseEvent('click');
      Object.defineProperties(clickEvent, { stopPropagation: { value: jest.fn() } });
      firstResizer.dispatchEvent(clickEvent);
      fixture.detectChanges();

      expect(clickEvent.stopPropagation).toHaveBeenCalled();
    });

    describe(`TsHeaderCellDirective.determineWidth`, () => {

      test(`should not allow column to go below minimum width`, () => {
        expect(TsHeaderCellDirective['determineWidth'](100, -50)).toEqual(70);
        expect(TsHeaderCellDirective['determineWidth'](140, -50)).toEqual(90);
      });

    });

  });

});
