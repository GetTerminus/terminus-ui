import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui/validators';


@Component({
  selector: 'demo-csv-entry',
  templateUrl: './csv-entry.component.html',
})
export class CSVEntryComponent {
  validators = [
    Validators.required,
    this.validatorsService.url(),
  ];
  results: string | undefined;

  constructor(
    private validatorsService: TsValidatorsService,
  ) {}


  file(v: Blob) {
    console.log('DEMO: Got file from CSV entry: ', v);
  }

}
