import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TsValidatorsService } from '@terminus/ui';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { TsAutocompleteComponent } from '@terminus/ui';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounce } from 'rxjs/operators/debounce';
import { startWith } from 'rxjs/operators/startWith';
import { timer } from 'rxjs/observable/timer';

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

const GITHUB_API_ENDPOINT = 'https://api.github.com';


@Component({
  selector: 'demo-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent implements OnInit {

  @ViewChild('auto')
  public auto: TsAutocompleteComponent;

  myForm = this.formBuilder.group({
    selections: [
      null,
      [
        Validators.required,
      ],
    ],
  });
  initial = OPTIONS.slice(2, 4);

  // store subscription to autocomplete changes
  changesSubscription$: Observable<any>;

  users$: any;


  ngOnInit() {
    this.changesSubscription$ = this.auto.selection.subscribe((v: any) => {
      console.log('DEMO: subscription change ', v);
    })

    this.users$ = this.auto
      .query
      .pipe(
        startWith(null),
        debounce(() => timer(200)),
        switchMap((term) => {
          if (term) {
            console.log('searching term: ', term)
            return this._http.get(`${GITHUB_API_ENDPOINT}/search/users?q=${term}`)
              .pipe(
                map((response: Response) => {
                  /*
                   *console.log('response (with query): ', response)
                   */
                  return response['items'];
                }),
              )
          } else {
            return this._http.get(`${GITHUB_API_ENDPOINT}/users`)
              .pipe(
                map((response: Response) => {
                  /*
                   *console.log('response (no query): ', response)
                   */
                  return response;
                }),
              )
          }
        })
      )
    ;
  }


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
    private _http: HttpClient,
  ) {}



  displayFn(user?: any): string | undefined {
    return user ? user.login : undefined;
  }


  added(chip: any) {
    /*
     *console.log('DEMO: chip added', chip);
     */
  }

  removed(chip: any) {
    /*
     *console.log('DEMO: chip removed', chip);
     */
  }

  change(selections: any) {
    /*
     *console.log('DEMO: chip selections changed', selections);
     */
  }

  submit(v: any) {
    console.log('Demo: form submit: ', v);
  }

}
