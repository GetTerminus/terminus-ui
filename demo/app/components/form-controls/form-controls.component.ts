import { Component } from '@angular/core';
import { TsOption } from '../../../../dist/terminus-ui/option/option.component';

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
  selectionListFormatter = v => v.name;
  uiFormatterRadio = v => v.name;
  modelFormatterRadio = v => v.value;
  inputModel = 'My value';
}
