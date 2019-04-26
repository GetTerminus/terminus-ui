import {
  Component,
  DebugElement,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  TestModuleMetadata,
} from '@angular/core/testing';
import { ValidatorFn, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  configureTestBedWithoutReset,
  createFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
} from '@terminus/ngx-tools/testing';
import { TsValidatorsService } from '@terminus/ui/validators';

import {
  TsCSVEntryComponent,
  TsCSVFormContents,
} from './csv-entry.component';
import { TsCSVEntryModule } from './csv-entry.module';




/**
 * Helper to turn JSON form into stringified content
 */
function stringifyForm(content: TsCSVFormContents): string {
  const headers: string = content.headers.join('\t') + '\r\n';
  const rows: string = content.records.map((v) => v.columns.join('\t')).join('\r\n') + '\r\n';
  return headers + rows;
}


@Component({
  template: `
    <ts-csv-entry
       [id]="id"
       [maxRows]="maxRows"
       [columnCount]="columnCount"
       [rowCount]="rowCount"
       [columnValidators]="columnValidators"
       [columnHeaders]="columnHeaders"
       [fullWidth]="fullWidth"
       [outputFormat]="outputFormat"
       (blobGenerated)="gotFile($event)"
    ></ts-csv-entry>
  `,
})
class TestHostComponent {
  id: number | undefined;
  maxRows: number | undefined;
  columnCount: number | undefined;
  rowCount: number | undefined;
  columnValidators: undefined | (ValidatorFn | null)[];
  columnHeaders: undefined | string[];
  fullWidth: boolean;
  outputFormat = 'csv';
  gotFile = jest.fn();

  @ViewChild(TsCSVEntryComponent)
  component!: TsCSVEntryComponent;

  constructor(
    public validatorsService: TsValidatorsService,
  ) {
  }
}


describe(`TsCSVEntryComponent`, function() {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: TsCSVEntryComponent;
  let firstHeaderCell: HTMLInputElement;
  let rowCount: number;
  let columnCount: number;
  const moduleDefinition: TestModuleMetadata = {
    imports: [
      TsCSVEntryModule,
    ],
    declarations: [
      TestHostComponent,
    ],
    providers: [
      TsValidatorsService,
    ],
  };
  let formContentTwoCol: TsCSVFormContents;
  let formContentThreeCol: TsCSVFormContents;
  let formContentManyErrors: TsCSVFormContents;
  let formContentRequiredErrors: TsCSVFormContents;
  let formContentWithQuotesAndCommas: TsCSVFormContents;
  const createPasteEvent = (content: TsCSVFormContents): ClipboardEvent => {
    const event = createFakeEvent('paste') as ClipboardEvent;
    const stringValue = stringifyForm(content);
    (event.clipboardData as any) = {
      getData: jest.fn().mockReturnValue(stringValue),
    };
    return event;
  };
  let ENTER_EVENT: KeyboardEvent;
  let SHIFT_ENTER_EVENT: KeyboardEvent;
  let TAB_EVENT: KeyboardEvent;
  let SHIFT_TAB_EVENT: KeyboardEvent;

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    // Reset parent component inputs
    if (hostComponent) {
      hostComponent.id = undefined;
      hostComponent.maxRows = undefined;
      hostComponent.columnCount = undefined;
      hostComponent.rowCount = undefined;
      hostComponent.columnValidators = undefined;
      hostComponent.columnHeaders = undefined;
      hostComponent.outputFormat = 'csv';
    }
    /**
     * Form content
     */
    formContentTwoCol = {
      headers: ['foo', 'bar'],
      records: [
        { recordId: 0, columns: ['foo1', 'bar1'] },
        { recordId: 1, columns: ['foo2', 'bar2'] },
        { recordId: 2, columns: ['foo3', 'bar3'] },
      ],
    };
    formContentThreeCol = {
      headers: ['bing', 'bang', 'boom'],
      records: [
        { recordId: 0, columns: ['bing1', 'bang1', 'http://foo.com'] },
        { recordId: 1, columns: ['bing2', 'bang2', 'boom2'] },
        { recordId: 2, columns: ['bing3', 'bang3', 'boom3'] },
        { recordId: 3, columns: ['bing4', 'bang4', 'boom4'] },
      ],
    };
    formContentManyErrors = {
      headers: ['bing', 'bang', 'boom'],
      records: [
        { recordId: 0, columns: ['bing1', 'http://foo.com', 'boom1'] },
        { recordId: 1, columns: ['bing2', 'bang2', 'boom2'] },
        { recordId: 2, columns: ['bing3', 'bang3', 'boom3'] },
        { recordId: 3, columns: ['bing4', 'bang4', 'boom4'] },
        { recordId: 4, columns: ['bing5', '1234567890987654321234567890', 'boom5'] },
        { recordId: 5, columns: ['bing6', 'bang6', 'boom6'] },
        { recordId: 6, columns: ['bing7', 'bang7', 'boom7'] },
        { recordId: 7, columns: ['bing8', 'bang8', 'boom8'] },
        { recordId: 8, columns: ['bing9', 'bang9', 'boom9'] },
      ],
    };
    formContentRequiredErrors = {
      headers: ['bing', 'bang'],
      records: [
        { recordId: 0, columns: ['bing1', 'http://foo.com', 'boom1'] },
        { recordId: 1, columns: [null, 'bang2', 'boom2'] },
        { recordId: 2, columns: ['bing3', 'bang3', 'boom3'] },
      ],
    };
    formContentWithQuotesAndCommas = {
      headers: ['bing', 'bang'],
      records: [
        { recordId: 0, columns: ['a, b', '"foo"'] },
        { recordId: 1, columns: ['"foo, bar"', '"foo", "bar"'] },
      ],
    };
    /**
     * Set up events
     */
    TAB_EVENT = document.createEvent('KeyboardEvent');
    TAB_EVENT.initEvent('keydown', true, false);
    Object.defineProperties(TAB_EVENT, {
      code: { get: () => KEYS.TAB.code },
      key: { get: () => KEYS.TAB.code },
      keyCode: { get: () => KEYS.TAB.keyCode },
    });
    SHIFT_TAB_EVENT = document.createEvent('KeyboardEvent');
    SHIFT_TAB_EVENT.initEvent('keydown', true, false);
    Object.defineProperties(SHIFT_TAB_EVENT, {
      code: { get: () => KEYS.TAB.code },
      key: { get: () => KEYS.TAB.code },
      keyCode: { get: () => KEYS.TAB.keyCode },
      shiftKey: { get: () => true },
    });
    ENTER_EVENT = document.createEvent('KeyboardEvent');
    ENTER_EVENT.initEvent('keydown', true, false);
    Object.defineProperties(ENTER_EVENT, {
      code: { get: () => KEYS.ENTER.code },
      key: { get: () => KEYS.ENTER.code },
      keyCode: { get: () => KEYS.ENTER.keyCode },
    });
    SHIFT_ENTER_EVENT = document.createEvent('KeyboardEvent');
    SHIFT_ENTER_EVENT.initEvent('keydown', true, false);
    Object.defineProperties(SHIFT_ENTER_EVENT, {
      code: { get: () => KEYS.ENTER.code },
      key: { get: () => KEYS.ENTER.code },
      keyCode: { get: () => KEYS.ENTER.keyCode },
      shiftKey: { get: () => true },
    });

    /**
     * Expose items
     */
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.component;
    fixture.detectChanges();
    firstHeaderCell = fixture.debugElement.query(By.css('#r_-1Xc_0')).nativeElement;
    rowCount = fixture.nativeElement.querySelectorAll('.c-csv-entry__column-id').length;
    columnCount = fixture.nativeElement.querySelectorAll('.c-csv-entry__input--header').length;
  });


  describe(`initialization`, () => {

    test(`should create the default set of columns and rows`, () => {
      expect(rowCount).toEqual(component.rowCount);
      expect(columnCount).toEqual(component.columnCount);
    });

  });


  test(`should support a custom ID`, () => {
    component.id = 'foo';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('ts-csv-entry'));
    expect(el.nativeElement.getAttribute('id')).toEqual('foo');
  });


  describe(`pasting content`, () => {

    test(`should inject cell contents`, () => {
      expect(firstHeaderCell.value).toEqual('');
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));

      expect(firstHeaderCell.value).toEqual('foo');
      expect(component.columnCount).toEqual(2);
      expect(component.rows.length).toEqual(4);
    });


    test(`should update column and row counts`, () => {
      expect(firstHeaderCell.value).toEqual('');
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentThreeCol));
      fixture.detectChanges();

      expect(firstHeaderCell.value).toEqual('bing');
      expect(component.columnCount).toEqual(3);
      expect(component.rows.length).toEqual(5);
    });


    test(`should correctly inject content into existing content`, () => {
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      fixture.detectChanges();
      let row2Cell1: HTMLInputElement = fixture.debugElement.query(By.css('#r_1Xc_0')).nativeElement;
      expect(row2Cell1.value).toEqual('foo2');

      const stringRecords = 'bing4\tbang4\r\nbing5\tbang5\r\n';
      const event = createFakeEvent('paste') as ClipboardEvent;
      (event.clipboardData as any) = {
        getData: jest.fn().mockReturnValue(stringRecords),
      };
      row2Cell1.dispatchEvent(event);
      fixture.detectChanges();
      row2Cell1 = fixture.debugElement.query(By.css('#r_1Xc_0')).nativeElement;
      expect(row2Cell1.value).toEqual('bing4');

      const row4Cell1 = fixture.debugElement.query(By.css('#r_4Xc_0')).nativeElement;
      expect(row4Cell1.value).toEqual('foo3');
    });


    test(`should not create new rows when pasting content to a single cell`, () => {
      const event = createFakeEvent('paste') as ClipboardEvent;
      (event.clipboardData as any) = {
        getData: jest.fn().mockReturnValue('new'),
      };
      component['splitContent'] = jest.fn();
      component.onPaste(event);

      expect(component['splitContent']).not.toHaveBeenCalled();
    });


    test(`should do nothing if the paste event has no content`, () => {
      const event = createFakeEvent('paste') as ClipboardEvent;
      (event.clipboardData as any) = {
        getData: jest.fn().mockReturnValue(''),
      };
      component['splitContent'] = jest.fn();
      component.onPaste(event);

      expect(component['splitContent']).not.toHaveBeenCalled();
    });


    test(`should consider a header paste to be a body paste if columnHeaders are set`, () => {
      hostComponent.columnHeaders = ['one', 'two'];
      component['clearAllRows'] = jest.fn();
      fixture.detectChanges();
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      fixture.detectChanges();
      expect(component['clearAllRows']).not.toHaveBeenCalled();
    });


    test(`should allow for fullWidth table`, () => {
      expect(component['fullWidth']).toBeFalsy();
      expect(document.querySelector('.c-csv-entry--full-width')).toBeNull();
      component.fullWidth = true;
      fixture.detectChanges();
      expect(component['fullWidth']).toBeTruthy();
      expect(document.querySelector('.c-csv-entry--full-width')).not.toBeNull();
    });

  });


  describe(`keyboard navigation`, () => {

    test(`should navigate rows with enter & shift+enter`, () => {
      const cell1: HTMLInputElement = fixture.debugElement.query(By.css('#r_0Xc_0')).nativeElement;
      const cell2: HTMLInputElement = fixture.debugElement.query(By.css('#r_1Xc_0')).nativeElement;

      // Current cell:
      cell1.focus();
      expect(document.activeElement).toEqual(cell1);

      // Move down:
      cell1.dispatchEvent(ENTER_EVENT);
      expect(document.activeElement).toEqual(cell2);

      // Cell below
      cell2.dispatchEvent(SHIFT_ENTER_EVENT);
      expect(document.activeElement).toEqual(cell1);
    });


    test(`should navigate columns with tab & tab+enter`, () => {
      const cell1: HTMLInputElement = fixture.debugElement.query(By.css('#r_1Xc_0')).nativeElement;
      const cell2: HTMLInputElement = fixture.debugElement.query(By.css('#r_1Xc_1')).nativeElement;

      // Current cell:
      cell1.focus();
      expect(document.activeElement).toEqual(cell1);

      cell1.dispatchEvent(TAB_EVENT);
      expect(document.activeElement).toEqual(cell2);

      cell2.dispatchEvent(SHIFT_TAB_EVENT);
      expect(document.activeElement).toEqual(cell1);
    });


    test(`should change row if the column isn't found`, () => {
      const lastCell: HTMLInputElement = fixture.debugElement.query(By.css('#r_1Xc_1')).nativeElement;
      const firstCell: HTMLInputElement = fixture.debugElement.query(By.css('#r_2Xc_0')).nativeElement;

      // Current cell:
      lastCell.focus();
      expect(document.activeElement).toEqual(lastCell);

      lastCell.dispatchEvent(TAB_EVENT);
      expect(document.activeElement).toEqual(firstCell);

      firstCell.dispatchEvent(SHIFT_TAB_EVENT);
      expect(document.activeElement).toEqual(lastCell);
    });


    test(`should create a new row if moving down and one doesn't exist`, () => {
      const lastRowId = `#r_${component.rows.length - 1}Xc_0`;
      const lastRowCell: HTMLInputElement = fixture.debugElement.query(By.css(lastRowId)).nativeElement;
      expect(component.rows.length).toEqual(4);

      lastRowCell.dispatchEvent(ENTER_EVENT);
      fixture.detectChanges();
      expect(component.rows.length).toEqual(5);
    });

  });


  describe(`selectCellInNextRow()`, () => {
    let mock;

    beforeEach(() => {
      mock = jest.spyOn(component['documentService'].document, 'querySelector');
    });


    test(`should do nothing if no valid ID was passed in`, () => {
      component.selectCellInNextRow(null as any);
      expect(mock).not.toHaveBeenCalled();
    });


    afterEach(() => {
      mock.mockRestore();
    });

  });


  describe(`columnValidators`, () => {

    beforeEach(() => {
      hostComponent.columnValidators = [null, hostComponent.validatorsService.url()];
      fixture.detectChanges();
    });


    test(`should set valid/invalid status on form controls and rows`, () => {
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentThreeCol));
      expect(firstHeaderCell.value).toEqual('bing');

      const idRow: HTMLElement = fixture.debugElement.query(By.css('#csv-row-id-2')).nativeElement;
      expect(idRow.classList).toContain('c-csv-entry__column-id--invalid');
    });


    test(`should show validation messages`, () => {
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentThreeCol));
      expect(firstHeaderCell.value).toEqual('bing');
      const validations: DebugElement[] = fixture.debugElement.queryAll(By.css('.c-csv-entry__message'));

      expect(validations.length).toBeGreaterThan(0);
    });


    test(`should truncate if more than the max amount of messages exist`, () => {
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentManyErrors));
      expect(firstHeaderCell.value).toEqual('bing');
      const validations: DebugElement[] = fixture.debugElement.queryAll(By.css('.c-csv-entry__message'));

      expect(validations.length).toEqual(7);
      expect(validations[validations.length - 1].nativeElement.textContent).toEqual(expect.stringContaining('more errors'));
    });


    test(`should truncate error item if it is too long`, () => {
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentManyErrors));
      expect(firstHeaderCell.value).toEqual('bing');
      const validations: DebugElement[] = fixture.debugElement.queryAll(By.css('.c-csv-entry__message'));

      expect(validations[3].nativeElement.innerHTML).toEqual(expect.stringContaining('..." is not a valid URL'));
    });


    test(`should output required error`, () => {
      hostComponent.columnValidators = [Validators.required, hostComponent.validatorsService.url()];
      fixture.detectChanges();
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentRequiredErrors));
      expect(firstHeaderCell.value).toEqual('bing');
      const validations: DebugElement[] = fixture.debugElement.queryAll(By.css('.c-csv-entry__message'));

      expect(validations[1].nativeElement.innerHTML).toEqual(expect.stringContaining('Content is required'));
    });

  });


  describe(`a validation message for too many rows`, () => {

    beforeEach(() => {
      hostComponent.maxRows = 5;
      fixture.detectChanges();
    });


    test(`should be visible when pasting too many rows`, () => {
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      fixture.detectChanges();

      const bodyCell = fixture.debugElement.query(By.css('#r_3Xc_0')).nativeElement;
      bodyCell.dispatchEvent(createPasteEvent(formContentThreeCol));
      fixture.detectChanges();
      const message = fixture.debugElement.query(By.css('.c-csv-entry__message')).nativeElement;

      expect(message.textContent).toEqual(expect.stringContaining('rows would exceed the maximum rows allowed (5).'));
    });


    test(`should be visible when clicking 'add row' too many times`, () => {
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      fixture.detectChanges();

      const addRowButton = fixture.debugElement.query(By.css('#ts-csv-add-row')).nativeElement;
      dispatchMouseEvent(addRowButton, 'clicked');
      dispatchMouseEvent(addRowButton, 'clicked');
      fixture.detectChanges();
      const message = fixture.debugElement.query(By.css('.c-csv-entry__message')).nativeElement;

      expect(message.textContent).toEqual('Adding 1 row would exceed the maximum rows allowed (5).');
    });

  });


  describe(`resetTable()`, () => {

    test(`should restore the table to the default settings`, () => {
      hostComponent.maxRows = 5;
      fixture.detectChanges();
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentThreeCol));
      let row2Cell1: HTMLInputElement = fixture.debugElement.query(By.css('#r_1Xc_0')).nativeElement;
      expect(row2Cell1.value).toEqual(expect.any(String));

      const addRowButton = fixture.debugElement.query(By.css('#ts-csv-add-row')).nativeElement;
      dispatchMouseEvent(addRowButton, 'clicked');
      dispatchMouseEvent(addRowButton, 'clicked');
      fixture.detectChanges();
      let message = fixture.debugElement.query(By.css('.c-csv-entry__message')).nativeElement;
      expect(message).toBeTruthy();

      const resetButton: HTMLInputElement = fixture.debugElement.query(By.css('#ts-csv-reset')).nativeElement;
      dispatchMouseEvent(resetButton, 'clicked');
      fixture.detectChanges();

      row2Cell1 = fixture.debugElement.query(By.css('#r_1Xc_0')).nativeElement;
      message = fixture.debugElement.query(By.css('.c-csv-entry__message'));
      expect(row2Cell1.value).toEqual('');
      expect(component.columnCount).toEqual(component['columnCount']);
      expect(component.rows.length).toEqual(component.rowCount);
      expect(message).toBeFalsy();
    });

  });


  describe(`deleteRow()`, () => {
    let mock;

    beforeEach(() => {
      mock = jest.spyOn(component, 'updateAllRowIds');
    });


    test(`should do nothing if called with no valid index`, () => {
      component.deleteRow(undefined as any);
      component.deleteRow(null as any);
      expect(mock).not.toHaveBeenCalled();
    });


    test(`should do nothing if no valid index was passed in`, () => {
      component.deleteRow(-1);
      expect(mock).not.toHaveBeenCalled();
    });


    afterEach(() => {
      mock.mockRestore();
    });

  });


  describe(`a file blob`, () => {

    test(`should be generated and emitted when the form changes`, () => {
      jest.useFakeTimers();
      expect(firstHeaderCell.value).toEqual('');
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      jest.advanceTimersByTime(10);

      expect(hostComponent.gotFile).toHaveBeenLastCalledWith(expect.any(Blob));
      jest.runAllTimers();
    });


    test(`should respect output format of tsv`, fakeAsync((done) => {
      jest.useFakeTimers();
      expect(firstHeaderCell.value).toEqual('');
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      jest.advanceTimersByTime(10);

      const reader = new FileReader();
      const calls = hostComponent.gotFile.mock.calls;
      const content = calls[0][0];
      reader.onloadend = function() {
        expect(reader.result).toContain('\t');
        done();
        jest.clearAllTimers();
      };
      reader.readAsText(content);

    }));


    test(`should respect output format of csv`, fakeAsync((done) => {
      jest.useFakeTimers();
      expect(firstHeaderCell.value).toEqual('');
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      jest.advanceTimersByTime(10);
      hostComponent.outputFormat = 'csv';

      const reader = new FileReader();
      const calls = hostComponent.gotFile.mock.calls;
      const content = calls[0][0];
      reader.onloadend = function() {
        expect(reader.result).toContain(',');
        done();
        jest.clearAllTimers();
      };
      reader.readAsText(content);
    }));

  });


  describe(`onScroll()`, () => {
    let event: WheelEvent;
    const target = {
      form: {
        scrollLeft: 10,
        offsetWidth: 100,
        scrollWidth: 200,
      },
    };

    beforeEach(() => {
      event = createFakeEvent('scroll') as WheelEvent;
      event.preventDefault = jest.fn();
      Object.defineProperties(event, {
        target: {
          value: target,
        },
        srcElement: {
          value: target,
        },
        screenY: {
          value: 200,
        },
        deltaX: {
          value: -1,
        },
      });
    });


    test(`should do nothing if no event is received`, () => {
      expect(component.onScroll(null as any)).toEqual(undefined);
    });


    test(`should prevent the default event when reaching the left edge`, () => {
      component.onScroll(event);
      expect(event.preventDefault).not.toHaveBeenCalled();

      (event.target as any).form.scrollLeft = 0;

      component.onScroll(event);
      expect(event.preventDefault).toHaveBeenCalled();

      // Check that it works with srcElement instead
      Object.defineProperties(event, {
        target: {
          value: null,
        },
      });

      component.onScroll(event);
      expect(event.preventDefault).toHaveBeenCalledTimes(2);
    });


    test(`should prevent the default event when reaching the right edge`, () => {
      Object.defineProperties(event, {
        deltaX: {
          value: 1,
        },
      });
      component.onScroll(event);
      expect(event.preventDefault).not.toHaveBeenCalled();

      (event.target as any).form.scrollLeft = 98;

      component.onScroll(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

  });


  describe(`getHeaderCellName()`, () => {

    test(`should return an empty string if the header isn't found`, () => {
      expect(component.getHeaderCellName(20)).toEqual('');
    });

  });


  describe(`columnHeaders`, () => {

    test(`should set the header content and not allow changes`, () => {
      jest.useFakeTimers();
      hostComponent.columnHeaders = ['one', 'two'];
      fixture.detectChanges();
      firstHeaderCell.dispatchEvent(createPasteEvent(formContentTwoCol));
      jest.advanceTimersByTime(10);
      fixture.detectChanges();

      // Try typing to verify the input is readonly
      dispatchKeyboardEvent(firstHeaderCell, 'keyup', KEYS.A);
      dispatchKeyboardEvent(firstHeaderCell, 'keyup', KEYS.A);
      dispatchKeyboardEvent(firstHeaderCell, 'keyup', KEYS.A);
      fixture.detectChanges();

      expect(firstHeaderCell.value).toEqual('one');
      expect(component.columnCount).toEqual(2);
      jest.runAllTimers();
    });

  });

  test(`should correctly handle commas and quotes`, fakeAsync((done) => {
    jest.useFakeTimers();
    hostComponent.outputFormat = 'csv';
    firstHeaderCell.dispatchEvent(createPasteEvent(formContentWithQuotesAndCommas));
    jest.advanceTimersByTime(10);
    const reader = new FileReader();
    const calls = hostComponent.gotFile.mock.calls;
    const content = calls[0][0];
    reader.onloadend = function() {
      expect(reader.result).toContain('\"a, b\"');
      expect(reader.result).toContain('\"foo, bar\"');
      expect(reader.result).toContain('\"foo\", \"bar\"');

      done();
      jest.clearAllTimers();
    };
    reader.readAsText(content);
  }));

});
