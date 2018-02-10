import {
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui';


export interface ResultObject {
  name: string;
  id: string;
}

const OPTIONS: ResultObject[] = [
  {
    name: 'Lemon',
    id: '1',
  },
  {
    name: 'Lime',
    id: '2',
  },
  {
    name: 'Apple',
    id: '3',
  },
  {
    name: 'Orange',
    id: '4',
  },
  {
    name: 'Pear',
    id: '5',
  },
  {
    name: 'Grapefruit',
    id: '6',
  },
  {
    name: 'Nectarine',
    id: '7',
  },
  {
    name: 'Pineapple',
    id: '8',
  },
];


@Component({
  selector: 'demo-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent implements OnInit {
  // Fake results from API
  resultsFromApi: Observable<ResultObject[]> = of(OPTIONS);

  myForm = this.formBuilder.group({
    myInput: [
      null,
      [
        Validators.required,
      ],
    ],
  });


  ngOnInit() {
    console.log('this.resultsFromApi: ', this.resultsFromApi)
    console.log('control: ', this.myForm.get('myInput'))
  }


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
  ) {}



  displayFn(fruit?: any): string | undefined {
    return fruit ? fruit.name : undefined;
  }


  added(chip: any) {
    console.log('DEMO: chip added', chip)
  }

  removed(chip: any) {
    console.log('DEMO: chip removed', chip)
  }

  change(selections: any) {
    console.log('DEMO: chip selections changed', selections)
  }
}
