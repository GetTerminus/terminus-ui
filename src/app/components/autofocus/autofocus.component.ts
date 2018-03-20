import { Component } from '@angular/core';

import { TsSelectItem } from '@terminus/ui';


@Component({
  selector: 'demo-autofocus',
  templateUrl: './autofocus.component.html',
})
export class AutofocusComponent {
  example = 'default';
  items: TsSelectItem[] = [
    {
      name: 'tsAutofocus',
      value: 'default',
    },
    {
      name: '[tsAutofocus]="true"',
      value: 'bindingTrue',
    },
    {
      name: '[tsAutofocus]="my string"',
      value: 'bindingString',
    },
    {
      name: 'tsAutofocus=""',
      value: 'emptyString',
    },
    {
      name: '[tsAutofocus]="false"',
      value: 'bindingFalse',
    },
  ];
}
