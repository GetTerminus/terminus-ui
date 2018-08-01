import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Observable,
  of,
} from 'rxjs';


@Component({
  selector: 'demo-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  simpleItems: number[] = [1, 2, 3, 4];
  initialSimpleItemsSelection = 2;
  items: Observable<any[]> = of([
    {
      foo: 'Foo',
      slug: 'foo',
    },
    {
      foo: 'Bar',
      slug: 'bar',
    },
    {
      foo: 'Baz',
      slug: 'baz',
    },
  ]);
  label = 'Select a Thing';
  blank = 'none';
  multipleAllowed = true;
  myForm: FormGroup = this.formBuilder.group({
    myChoices1: [
      null,
      [Validators.required],
    ],
    myChoices2: [
      null,
      [Validators.required],
    ],
  });
  myUIFn = (v: any): string => v.foo;
  myModelFn = (v: any): string => v.slug;


  constructor(
    private formBuilder: FormBuilder,
  ) {}


  run(): void {
    console.log('DEMO: in run');
  }

  openStateChange(e: boolean): void {
    console.log('DEMO: opened/closed: ', e);
  }

  isChanged(e: any[]): void {
    console.log('DEMO: changed: ', e);
  }

  log(v: any): void {
    console.log('DEMO: Form value: ', v);
  }

  update() {
    const ctrl1 = this.myForm.get('myChoices1');
    const ctrl2 = this.myForm.get('myChoices2');
    if (ctrl1 && ctrl2) {
      ctrl1.setValue(3);
      ctrl2.setValue(['baz', 'bar']);
    }
  }
}
