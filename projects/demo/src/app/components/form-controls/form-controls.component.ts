import { Component } from '@angular/core';
import { TsOption } from '@terminus/ui/option';

export interface MyOption extends TsOption {
  name: string;
  value: number;
}

@Component({
  selector: 'demo-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss'],
  host: {
    class: 'form-control-demo',
  },
})
export class FormControlsComponent {
  options: MyOption[] = [
    {
      name: 'One',
      value: 100,
    },
    {
      name: 'Two',
      value: 200,
    },
    {
      name: 'Three',
      value: 300,
    },
  ];
  selectionListModel = [this.options[0]];
  selectionListModelSingle = [this.options[0]];
  emptyModel1 = [];
  emptyModel2 = [];
  selectionListFormatter = v => v ? v.name : '';
  uiFormatterRadio = v => v.name;
  modelFormatterRadio = v => v.value;
  inputModel = 'My value';
}
