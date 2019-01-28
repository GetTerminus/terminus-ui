import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  of,
} from 'rxjs';
import { map, delay, switchMap, startWith } from 'rxjs/operators';
import {
  TsAutocompleteComponent,
  TsAutocompleteComparatorFn,
} from '@terminus/ui/autocomplete';


interface GitHubUser {
  [key: string]: any;
}

// Values used to seed initial selections
const INITIAL: GitHubUser[] = [
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
  },
];
const INJECTION_ITEM = {
   login: 'asgg4321',
   id: 26461261,
   node_id: 'MDQ6VXNlcjI2NDYxMjYx',
   avatar_url: 'https://avatars2.githubusercontent.com/u/26461261?v=4',
   gravatar_id: '',
   url: 'https://api.github.com/users/asgg4321',
   html_url: 'https://github.com/asgg4321',
   followers_url: 'https://api.github.com/users/asgg4321/followers',
   following_url: 'https://api.github.com/users/asgg4321/following{/other_user}',
   gists_url: 'https://api.github.com/users/asgg4321/gists{/gist_id}',
   starred_url: 'https://api.github.com/users/asgg4321/starred{/owner}{/repo}',
   subscriptions_url: 'https://api.github.com/users/asgg4321/subscriptions',
   organizations_url: 'https://api.github.com/users/asgg4321/orgs',
   repos_url: 'https://api.github.com/users/asgg4321/repos',
   events_url: 'https://api.github.com/users/asgg4321/events{/privacy}',
   received_events_url: 'https://api.github.com/users/asgg4321/received_events',
   type: 'User',
   site_admin: false,
   score: 52.41921,
};

/**
 * Define an interface that represents the options we present to the user
 */
interface OptionType {
  id: string;
  login: string;
  [key: string]: any;
}


@Component({
  selector: 'demo-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent implements OnInit {
  // Using ViewChild to get a reference, we can pass in an interface for our autocomplete options
  @ViewChild('auto')
  public auto!: TsAutocompleteComponent<OptionType>;

  myForm = this.formBuilder.group({
    selections: [
      null,
      [
        Validators.required,
      ],
    ],
    selectionsMultiple: [
      null,
      [
        Validators.required,
      ],
    ],
  });
  initial = INITIAL.slice();
  debounceDelay = 2000;
  inProgress = false;
  delayApiResponse = false;
  changesSubscription$!: Observable<any>;
  users$: any;
  minCharacters = 4;


  ngOnInit() {
    this.changesSubscription$ = this.auto.selection.subscribe((v: any) => {
      console.log('DEMO: subscription change ', v);
    });

    this.users$ = this.auto
      .query
      .pipe(
        startWith(''),
        switchMap((term) => {
          if (term) {
            this.inProgress = true;
            console.warn('searching term: ', term);
            return this.http.get(`https://api.github.com/search/users?q=${term}`)
              .pipe(
                delay(this.delayApiResponse ? 3000 : 0),
                map((response: any) => {
                  this.inProgress = false;
                  const items: GitHubUser[] = response['items'];

                  // If no results are found, notify the user via a validation message
                  if (items.length < 1) {
                    const invalidResponse: ValidationErrors = {
                      noResults: {
                        valid: false,
                      },
                    };

                    const control = this.myForm.get('selections');

                    if (control) {
                      control.setErrors(invalidResponse);
                      control.markAsTouched();
                    }
                  }
                  return items;
                }),
              );
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
    private http: HttpClient,
  ) {}


  updateSelections() {
    const ctrl = this.myForm.get('selections');
    if (ctrl) {
      ctrl.setValue([INJECTION_ITEM]);
    }
  }

  comparator: TsAutocompleteComparatorFn = (v: any) => v.id;

  displayFn(user?: any): string | undefined {
    return user ? user.login : undefined;
  }

  added(selection: OptionType): void {
    console.log('DEMO: selection added', selection);
  }

  removed(selection: OptionType): void {
    console.log('DEMO: selection removed', selection);
  }

  selection(selections: OptionType[]): void {
    console.log('DEMO: selections changed', selections);
  }

  log(formValue: {selections: OptionType[]}): void {
    console.log('Demo: form submit: ', formValue);
  }

}
