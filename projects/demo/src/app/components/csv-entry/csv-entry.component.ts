import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui/validators';


@Component({
  selector: 'demo-csv-entry',
  templateUrl: './csv-entry.component.html',
})
export class CSVEntryComponent {
  public validators = [
    Validators.required,
    this.validatorsService.url(),
  ];
  public results: string | undefined;
  public blob;
  public myFile;
  public footerDirection: 'ltr' | 'rtl' = 'ltr';

  constructor(
    private validatorsService: TsValidatorsService,
  ) {}

  public file(v: Blob): void {
    console.log('DEMO: Got file from CSV entry: ', v);
    this.blob = v;
  }

  public generateFile(): void {
    this.myFile = new File([this.blob], 'testCsv');
    saveFile(this.blob, 'test');
  }

}


// Helper function to generate a file download for testing purposes
/**
 * @param blob
 * @param filename
 */
function saveFile(blob: Blob, filename: string) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}
