import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@terminus/ngx-tools/coercion';
import {
  untilComponentDestroyed,
  TsDocumentService,
} from '@terminus/ngx-tools';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { stripControlCharacters } from './../utilities/strip-control-characters/stripControlCharacters';
import { TS_SPACING } from './../spacing/spacing.constant';



/**
 * The structure for an individual row
 */
export interface TsCSVEntryRecord {
  recordId: number;
  columns: (string | null)[];
}

/**
 * The structure for the form
 */
export interface TsCSVFormContents {
  headers: string[];
  records: TsCSVEntryRecord[];
}


/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;


/**
 * This is the csv-entry UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-csv-entry`: The primary container
 * - `qa-csv-entry-info`: Container for row/column count
 * - `qa-csv-entry-row`: A row
 * - `qa-csv-entry-cell`: A body cell
 * - `qa-csv-entry-header-cell`: A header cell
 * - `qa-csv-entry-header-row`: Container for a header row
 * - `qa-csv-entry-delete`: A delete button
 * - `qa-csv-entry`: Placed on the primary container
 *
 * @example
 * <ts-csv-entry
 *              id="my-id"
 *              maxRows="1000"
 *              columnCount="6"
 *              rowCount="12"
 *              fullWidth="false"
 *              [columnHeaders]="arrayOfHeaders"
 *              [columnValidators]="arrayOfValidators"
 *              outputFormat="csv"
 *              (blobGenerated)="handleTheFileBlob($event)"
 * ></ts-csv-entry>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-csv-entry',
  templateUrl: './csv-entry.component.html',
  styleUrls: ['./csv-entry.component.scss'],
  host: {
    class: 'ts-csv-entry',
    '[class.c-csv-entry--full-width]': 'fullWidth',
    '[attr.id]': 'id',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsCSVEntry',
})
export class TsCSVEntryComponent implements OnInit, OnDestroy {
  /**
   * Define the default component ID
   */
  protected _uid = `ts-csv-entry-${nextUniqueId++}`;

  /**
   * Define the default number of rows
   */
  public defaultRowCount = 4;

  /**
   * Define the default number of columns
   */
  public defaultColumnCount = 2;

  /**
   * Define the default for the maximum allowed rows
   */
  public defaultMaxRows = 2000;

  /**
   * Expose the flexbox layout gap
   */
  public layoutGap: string = TS_SPACING.small[0];

  /**
   * Expose a validation message if too many rows are added
   */
  public tooManyRowsMessage: string | null = null;

  /**
   * Define the number of validation messages that can be shown at once
   */
  public maximumValidationMessages = 6;

  /**
   * Store records (rows)
   */
  public records: TsCSVEntryRecord[] = [];

  /**
   * Initialize the records form with an empty array
   */
  public recordsForm: FormGroup = this.formBuilder.group({
    headers: this.formBuilder.array([]),
    records: this.formBuilder.array([]),
  });

  /*
   *public validationMessages: string[] | undefined;
   */
  public allErrors: {[key: string]: any}[] | null = null;

  /**
   * Get header cells as a form array
   */
  public get headerCells(): FormArray {
    return this.recordsForm.get('headers') as FormArray;
  }

  /**
   * Get rows as a form array
   */
  public get rows(): FormArray {
    return this.recordsForm.get('records') as FormArray;
  }

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this._uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id: string = this._uid;

  /**
   * Set the maximum number of allowed rows
   */
  @Input()
  public set maxRows(value: number) {
    this._maxRows = coerceNumberProperty(value, this.defaultMaxRows);
  }
  public get maxRows(): number {
    return this._maxRows;
  }
  private _maxRows: number = this.defaultMaxRows;

  /**
   * Set the number of columns
   */
  @Input()
  public set columnCount(value: number) {
    this._columnCount = coerceNumberProperty(value, this.defaultColumnCount);
  }
  public get columnCount(): number {
    return this._columnCount;
  }
  private _columnCount: number = this.defaultColumnCount;

  /**
   * Define the number of rows
   */
  @Input()
  public set rowCount(value: number) {
    this._rowCount = coerceNumberProperty(value, this.defaultRowCount);
  }
  public get rowCount(): number {
    return this._rowCount;
  }
  private _rowCount: number = this.defaultRowCount;

  /**
   * Allow full-width mode
   */
  @Input()
  public set fullWidth(value: boolean) {
    this._fullWidth = coerceBooleanProperty(value);
  }
  public get fullWidth(): boolean {
    return this._fullWidth;
  }
  private _fullWidth = false;

  /**
   * Allow static headers to be set
   */
  @Input()
  public set columnHeaders(value: string[] | undefined) {
    this._columnHeaders = value;
    this.clearHeaderCells();
    this.addHeaders(this.columnCount, this.columnHeaders);
  }
  public get columnHeaders(): string[] | undefined {
    return this._columnHeaders;
  }
  private _columnHeaders: string[] | undefined;

  /**
   * Define any column validators
   */
  @Input()
  public set columnValidators(value: ValidatorFn | null[]) {
    if (!value) {
      return;
    }

    this._columnValidators = value;
  }
  public get columnValidators(): ValidatorFn | null[] {
    return this._columnValidators;
  }
  private _columnValidators: ValidatorFn | null[] = [];

  /**
   * Define output to be CSV rather than TSV
   */
  @Input()
  public outputFormat: 'csv' | 'tsv' = 'tsv';

  /**
   * Emit the built file blob
   */
  @Output()
  public blobGenerated: EventEmitter<Blob> = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private documentService: TsDocumentService,
  ) {}


  /**
   * Initialize empty rows
   */
  public ngOnInit(): void {
    this.addRows(this.rowCount, this.columnCount);
    this.addHeaders(this.columnCount, this.columnHeaders);

    this.recordsForm.valueChanges.pipe(
      // Let the form values 'settle' before we emit anything
      debounceTime(1),
      untilComponentDestroyed(this),
    ).subscribe((v) => {
      const blob = this.generateBlob(v);
      this.blobGenerated.emit(blob);
    });
  }


  /**
   * Needed for `untilComponentDestroyed`
   */
  public ngOnDestroy(): void {}


  /**
   * Add rows to the form
   *
   * @param rowCount - The number of rows to add
   * @param columnCount - The number of columns each row should have
   * @param content - The column content
   */
  public addRows(rowCount = 1, columnCount: number = this.columnCount, content?: string[][], index?: number): void {
    if ((this.rows.length + rowCount) > this.maxRows) {
      const rowsThatDontFit = (rowCount === 1 ? 2 : rowCount) - ((this.rows.length + rowCount) - this.maxRows);
      this.tooManyRowsMessage =
        `Adding ${rowsThatDontFit} row${rowsThatDontFit > 1 ? 's' : ''} would exceed the maximum rows allowed (${this.maxRows}).`;
      return;
    }

    if (this.tooManyRowsMessage) {
      this.tooManyRowsMessage = null;
    }

    for (let i = 0; i < rowCount; i += 1) {
      const indexToInjectAt: number = (index !== undefined ? index : this.rowCount) + i;
      const c: string[] | null = content ? content[i] : null;
      const createdRow: FormGroup = this.createRow(this.rows.length, c);

      if ((index !== undefined) && (index >= 0)) {
        this.rows.insert(indexToInjectAt, createdRow);
      } else {
        this.rows.push(createdRow);
      }
    }
  }


  /**
   * Get the columns of a row
   *
   * @param row - The row
   * @return The array of columns
   */
  public getColumns(row: FormGroup): FormArray {
    return row.get('columns') as FormArray;
  }


  /**
   * Update the form control for recordId on each row according to index.
   */
  public updateAllRowIds(): void {
    for (let i = 0; i < this.rows.length; i += 1) {
      const row: FormGroup = this.rows.controls[i] as FormGroup;
      // istanbul ignore else
      if (row) {
        row.controls.recordId.setValue(i);
      }
    }
  }


  /**
   * Handle paste event for standard content cell
   *
   * @param event - The paste event
   */
  public onPaste(event: ClipboardEvent, hasHeader?: boolean): void {
    const eventContent = event.clipboardData.getData('Text');
    if (!eventContent) {
      return;
    }

    // If the user is only pasting the content for a single cell - do nothing
    const isSingleCell = (eventContent.indexOf('\n') < 0) && (eventContent.indexOf('\t') < 0);
    if (isSingleCell) {
      return;
    }

    hasHeader = coerceBooleanProperty(hasHeader);
    const pastedRowId: number = parseInt((event.target as HTMLInputElement).id.split('X')[0].split('_')[1], 10);
    const content = this.splitContent(eventContent, hasHeader);
    const neededRows: number = content.rows.length;

    // If the paste was into a header cell, verify that header cell content doesn't already exist
    if (hasHeader) {
      this.clearAllRows();
      this.clearHeaderCells();
      this.addHeaders(content.headers.length, this.columnHeaders || content.headers);
      this.columnCount = content.headers.length;
      this.addRows(neededRows, content.headers.length, content.rows);
    } else {
      // Else: the paste happened in a body cell
      const pastedColumnCount = content.rows[0].length;

      // If more columns were pasted than currently exist, increase the column count
      if (pastedColumnCount > this.columnCount) {
        const numberOfMissingColumns = pastedColumnCount - this.columnCount;
        this.addColumnsToRows(this.rows, this.headerCells, numberOfMissingColumns);
        this.columnCount = pastedColumnCount;
      }
      this.deleteRow(pastedRowId);
      this.addRows(neededRows, content.rows.length, content.rows, pastedRowId);
    }

    this.updateAllRowIds();
    this.updateErrors();
    this.changeDetectorRef.detectChanges();
  }


  /**
   * Expose ability to trigger error updates from the DOM
   */
  public updateErrors(): void {
    this.allErrors = this.collectErrors();
  }


  /**
   * Helper to get the name (content) of a header cell for the title attribute
   *
   * @param index - The column index
   * @return The header cell content
   */
  public getHeaderCellName(index: number): string {
    if (!this.headerCells || !this.headerCells.controls[index]) {
      return '';
    }
    return this.headerCells.controls[index].value;
  }


  /**
   * Stop accidental page navigation when scrolling to the edges of the CSV form
   *
   * @param event - The scroll wheel event
   */
  public onScroll(event: WheelEvent): void {
    if (!event) {
      return;
    }
    const dir: string = (event.deltaX < 0) ? 'right' : 'left';
    // TypeScript doesn't believe `form` exists on `EventTarget`
    const targetEl: any = event.target || event.srcElement;
    const borderSize = 2;
    const scrollRight: number = targetEl.form.scrollWidth - (targetEl.form.offsetWidth + borderSize) - targetEl.form.scrollLeft;
    const scrollLeft = targetEl.form.scrollLeft;
    const stopRightScroll: boolean = (dir === 'right') && (scrollLeft < 1);
    const stopLeftScroll: boolean = (dir === 'left') && (scrollRight < 1);

    // If scrolling horizontally and at either edge, stop the scroll event
    if (event.deltaX !== 0 && (stopRightScroll || stopLeftScroll)) {
      event.preventDefault();
    }
  }


  /**
   * Change focus to the cell below the current cell
   *
   * @param currentCellId - The ID of the currently focused cell
   * @param up - The direction to move (up vs down)
   */
  public selectCellInNextRow(currentCellId: string, up?: boolean): void {
    if (!currentCellId) {
      return;
    }
    const [rowId, columnId]: string[] = currentCellId.split('X');
    const row: string = rowId.split('_')[1];
    const column: string = columnId.split('_')[1];
    const newId: string = 'r_' + (parseInt(row, 10) + (up ? -1 : 1)) + 'Xc_' + column;
    const input: HTMLElement | null = this.documentService.document.querySelector(`#${newId}`);

    if (input) {
      input.focus();
    } else {
      // Else we must be on the last row so we add one more
      this.addRows();
      this.changeDetectorRef.detectChanges();
      this.selectCellInNextRow(currentCellId);
    }
  }


  /**
   * Select the next cell or previous cell
   *
   * @param event - The KeyboardEvent
   * @param currentCellId - The ID of the currently focused cell
   * @param previous - If the movement is forward or backward
   */
  public selectAdjacentCell(event: KeyboardEvent, currentCellId: string, previous?: boolean): void {
    // Prevent native tabindex functionality
    event.preventDefault();
    previous = coerceBooleanProperty(previous);
    const [rowId, columnId]: string[] = currentCellId.split('X');
    const row: number = parseInt(rowId.split('_')[1], 10);
    const column: number = parseInt(columnId.split('_')[1], 10);
    const isFirstColumn: boolean = column === 0;
    const islastColumn: boolean = column === (this.columnCount - 1);
    let newColumnNumber: number;
    let newRowNumber: number = row;
    // If first column, move to last column of previous row
    if (previous) {
      // Backward
      if (isFirstColumn) {
        newColumnNumber = this.columnCount - 1;
        newRowNumber += -1;
      } else {
        newColumnNumber = column - 1;
      }
    } else {
      // Forward
      if (islastColumn) {
        newColumnNumber = 0;
        newRowNumber += 1;
      } else {
        newColumnNumber = column + 1;
      }
    }
    const newId: string = 'r_' + newRowNumber + 'Xc_' + newColumnNumber;
    const input: HTMLElement | null = this.documentService.document.querySelector(`#${newId}`);

    // istanbul ignore else
    if (input) {
      input.focus();
    }
  }


  /**
   * Create an ID for a cell. Format: `r_7Xc_2` would be the 2nd cell in the 7th row.
   *
   * @param recordIndex - The index of the record/row
   * @param cellIndex - The index of the cell within the row
   * @return The ID
   */
  public createId(recordIndex: number, cellIndex: number): string {
    return `r_${recordIndex}Xc_${cellIndex}`;
  }


  /**
   * Collect all errors from the recordsForm and set to allErrors
   */
  public collectErrors(): {[key: string]: any}[] | null {
    const group: FormArray | null = this.recordsForm.get('records') as FormArray;

    // istanbul ignore else
    if (group) {
      const errors = this.getFormErrors(group);

      // istanbul ignore else
      if (errors) {
        const resultsArray: {[key: string]: any}[] = Object.keys(errors).map((key) => {
          return {
            control: key,
            // De-duplicate the errors array
            [key]: errors[key].filter((el, i, arr) => arr.indexOf(el) === i),
          };
        });

        return resultsArray;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


  /**
   * Get all validation messages
   *
   * NOTE: Currently this only supports a custom error message for URL validation. Other messages can be added when the need arises.
   * FIXME: Find a way to use the existing ValidationMessagesService
   *
   * @return The array of validation messages
   */
  public get validationMessages(): string[] | undefined {
    if (!this.allErrors) {
      return;
    }
    const messages: string[] = [];

    for (const errorObj of this.allErrors) {
      const name: string = errorObj.control;

      for (const error of errorObj[name]) {
        let message = '';
        // The ID is zero-based
        message += `<b>Row ${error.rowId + 1}:</b> `;
        // istanbul ignore else
        if (name === 'url') {
          const maxItemLength = 20;
          const errorItem = (error.actual.length > maxItemLength) ? error.actual.slice(0, maxItemLength) + '...' : error.actual;
          message += `"${errorItem}" is not a valid URL.`;
        }
        // istanbul ignore else
        if (name === 'required') {
          message += `Content is required.`;
        }
        messages.push(message);
      }
    }

    // If more messages than allowed exist, truncate the list with a message
    if (messages.length > this.maximumValidationMessages) {
      const count = messages.length - this.maximumValidationMessages;
      messages.length = this.maximumValidationMessages;
      messages.push(`and ${count} more errors...`);
    }

    return messages.length > 0 ? messages : undefined;
  }


  /**
   * Delete a row
   *
   * @param index - The index of the row to delete
   */
  public deleteRow(index: number): void {
    if (index === undefined || index === null || index < 0) {
      return;
    }

    this.rows.removeAt(index);
    this.updateAllRowIds();
    this.updateErrors();
  }


  /**
   * Reset the table to it's initial state
   */
  public resetTable(): void {
    this.clearAllRows();
    this.clearHeaderCells();
    this.columnCount = this.defaultColumnCount;
    this.addRows(this.rowCount, this.columnCount);
    this.addHeaders(this.columnCount, this.columnHeaders);
    this.updateErrors();
  }


  /**
   * Get all form errors from a FormGroup or FormArray
   *
   * NOTE: This external function and `result` object is needed since `getAllErrors` may be recursive
   *
   * @param form - The form
   * @return The object of errors
   */
  private getFormErrors(form: FormGroup | FormArray): {[key: string]: any} {
    const result: {[key: string]: any} = {};
    this.getAllErrors(form, result);
    return result;
  }


  /**
   * Get all errors for the form
   *
   * @param form - The primary form group
   * @return An object containing all errors
   */
  private getAllErrors(form: FormGroup | FormArray, result: {[key: string]: any}): void {
    const keys = Object.keys(form.controls);

    for (let i = 0; i < keys.length; i += 1) {
      const ctrl = form.get(keys[i]);

      // istanbul ignore else
      if (ctrl) {
        const errors = (ctrl instanceof FormGroup || ctrl instanceof FormArray) ? this.getAllErrors(ctrl, result) : ctrl.errors;

        // istanbul ignore else
        if (errors) {
          // Get the record ID from the grandparent control
          const grandparentControls: any = ctrl.parent.parent.controls;
          const rowId: number | undefined = grandparentControls.recordId ?
            grandparentControls.recordId.value /* istanbul ignore next - Unreachable */ : undefined;
          const errorKeys = Object.keys(errors);

          for (let j = 0; j < errorKeys.length; j += 1) {
            const errorKey: string = errorKeys[j];
            let error: {[key: string]: any} = errors[errorKeys[j]];

            // Angular built in required validator only returns a boolean
            if (typeof error === 'boolean') {
              error = {
                valid: false,
              };
            }

            // If the rowId exists, add it to the errors object
            // istanbul ignore else
            if (rowId !== undefined) {
              error['rowId'] = rowId;
            }

            // Add this error to the result object
            if (result[errorKey]) {
              result[errorKey].push(error);
            } else {
              result[errorKey] = [error];
            }
          }
        }
      }
    }
  }


  /**
   * Split pasted data into headers, rows, and columns
   *
   * @param content - The event content
   * @return An object containing all data
   */
  private splitContent(content: string, hasHeaders: boolean): {[key: string]: any} {
    const result: {headers: undefined|string[]; rows: undefined|string[]|string[][]} = {
      headers: undefined,
      rows: undefined,
    };
    const rows = content.split('\n');

    if (hasHeaders) {
      result.headers = rows[0].split('\t');
      result.rows = rows.slice(1, rows.length).map((r) => r.split('\t'));
    } else {
      result.rows = rows.slice(0, rows.length).map((r) => r.split('\t'));
    }

    return result;
  }


  /**
   * Clear all rows
   */
  private clearAllRows(): void {
    this.recordsForm.setControl('records', this.formBuilder.array([]));
  }


  /**
   * Clear header cells
   */
  private clearHeaderCells(): void {
    this.recordsForm.setControl('headers', this.formBuilder.array([]));
  }


  /**
   * Add header content to the form
   *
   * @param headerCount - The number of header cells
   * @param content - The cell's content
   */
  private addHeaders(headerCount: number, content?: string[]): void {
    for (let i = 0; i < headerCount; i += 1) {
      const value: string | null = (content && content[i]) ? content[i] : null;
      const ctrl = value ? new FormControl(value) : new FormControl();
      this.headerCells.setControl(i, ctrl);
    }
  }


  /**
   * Create a row
   *
   * @param id - The row's ID
   * @param content - The column's content
   * @return The FormGroup
   */
  private createRow(id: number, content?: string[] | null): FormGroup {
    return this.formBuilder.group({
      recordId: new FormControl(id),
      columns: this.formBuilder.array(this.createColumns(this.columnCount, content)),
    });
  }


  /**
   * Create an array of columns
   *
   * @param count - The number of columns to create
   * @param content - An array of content to seed the columns with
   * @return The array of form controls
   */
  private createColumns(count: number, content?: string[] | null): FormControl[] {
    const columns: FormControl[] = [];

    for (let i = 0; i < count; i += 1) {
      let value: string | null = (content && content[i]) ? content[i] : null;

      // Strip any control characters
      if (value) {
        value = stripControlCharacters(value);
      }

      const validator: ValidatorFn | null =
        this.columnValidators ? this.columnValidators[i] /* istanbul ignore next - Unreachable */ : null;
      columns.push(new FormControl(value, validator));
    }

    return columns;
  }


  /**
   * Add columns to existing rows + header
   *
   * @param rows - The existing body rows
   * @param headerCells - The array of header cells
   * @param columnsToAdd - The number of columns to add
   */
  private addColumnsToRows(rows: FormArray, headerCells: FormArray, columnsToAdd: number): void {
    // Add columns to body rows
    for (let i = 0; i < rows.length; i += 1) {
      const row: FormGroup = rows.controls[i] as FormGroup;
      // istanbul ignore else
      if (row) {
        const columns = row.controls.columns as FormArray;

        for (let j = 0; j < columnsToAdd; j += 1) {
          columns.controls.push(new FormControl());
        }
      }

    }

    // Add columns to header
    for (let k = 0; k < columnsToAdd; k += 1) {
      headerCells.controls.push(new FormControl());
    }
  }


  /**
   * Generate a File blob from the form contents
   *
   * @param content - The recordForm content
   * @return The File blob
   */
  private generateBlob(content: TsCSVFormContents): Blob {
    const prefix = 'data:text/csv;charset=utf-8,';
    const headers: string = content.headers.join('\t') + '\r\n';
    const rows: string = content.records.map((v) => v.columns.join('\t')).join('\r\n') + '\r\n';
    let joined: string = prefix + headers + rows;
    // istanbul ignore else
    if (this.outputFormat === 'csv') {
      joined = JSON.stringify(joined).replace(/\\t/g, ',');
    }
    return new Blob([joined], {type: 'text/csv'});
  }

}
