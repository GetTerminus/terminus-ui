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
import {
  TsAutocompleteComponent,
  TsAutocompleteComparatorFn,
} from '@terminus/ui';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { delay } from 'rxjs/operators/delay';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounce } from 'rxjs/operators/debounce';
import { startWith } from 'rxjs/operators/startWith';
import { timer } from 'rxjs/observable/timer';


const INITIAL = [
  {
    login: 'benjamincharity',
    id: 270193,
    avatar_url: 'https://avatars3.githubusercontent.com/u/270193?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/benjamincharity',
    html_url: 'https://github.com/benjamincharity',
    followers_url: 'https://api.github.com/users/benjamincharity/followers',
    following_url: 'https://api.github.com/users/benjamincharity/following{/other_user}',
    gists_url: 'https://api.github.com/users/benjamincharity/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/benjamincharity/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/benjamincharity/subscriptions',
    organizations_url: 'https://api.github.com/users/benjamincharity/orgs',
    repos_url: 'https://api.github.com/users/benjamincharity/repos',
    events_url: 'https://api.github.com/users/benjamincharity/events{/privacy}',
    received_events_url: 'https://api.github.com/users/benjamincharity/received_events',
    type: 'User',
    site_admin: false,
    score: 82.52784,
  },
  {
    login: 'jnystrom',
    id: 1293142,
    avatar_url: 'https://avatars0.githubusercontent.com/u/1293142?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/jnystrom',
    html_url: 'https://github.com/jnystrom',
    followers_url: 'https://api.github.com/users/jnystrom/followers',
    following_url: 'https://api.github.com/users/jnystrom/following{/other_user}',
    gists_url: 'https://api.github.com/users/jnystrom/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/jnystrom/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/jnystrom/subscriptions',
    organizations_url: 'https://api.github.com/users/jnystrom/orgs',
    repos_url: 'https://api.github.com/users/jnystrom/repos',
    events_url: 'https://api.github.com/users/jnystrom/events{/privacy}',
    received_events_url: 'https://api.github.com/users/jnystrom/received_events',
    type: 'User',
    site_admin: false,
    score: 27.880474,
  }
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
  initial = INITIAL.slice();
  debounceDelay = 2000;
  inProgress = false;

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
        switchMap((term) => {
          if (term) {
            this.inProgress = true;
            console.warn('searching term: ', term)
            return this.http.get(`${GITHUB_API_ENDPOINT}/search/users?q=${term}`)
              .pipe(
                /*
                 *delay(3000),
                 */
                map((response: Response) => {
                  this.inProgress = false;
                  return response['items'];
                }),
              )
          } else {
            this.inProgress = false;
            return of([]);
          }
        }),
      )
    ;
  }


  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: TsValidatorsService,
    private http: HttpClient,
  ) {}



  comparator: TsAutocompleteComparatorFn = (v: any) => v.id;

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
