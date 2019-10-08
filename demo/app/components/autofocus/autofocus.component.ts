import { Component } from '@angular/core';


@Component({
  selector: 'demo-autofocus',
  templateUrl: './autofocus.component.html',
})
export class AutofocusComponent {
  example = 'default';
  items: any[] = [
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
