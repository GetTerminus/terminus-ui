import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  of,
} from 'rxjs';
import { map } from 'rxjs/operators';


export interface State {
  name: string;
  population: string;
}


@Component({
  selector: 'demo-select',
  templateUrl: './select.component.html',
})
export class SelectComponent implements OnInit {
  simpleItems: number[] = [1, 2, 3, 4];
  initialSimpleItemsSelection = 2;
  useSpacing = false;
  obj = {
    id: 3,
    text: 'baz',
  };
  singleWithCustomTrigger: Observable<any[]> = of([
    {
      foo: 'Foo bar baz foo bar baz foo bar baz',
      slug: 'foo',
      bar: {
        id: 1,
        text: 'foo',
      },
    },
    {
      foo: 'Bar Hic saepe ad sunt temporibus.',
      slug: 'bar',
      bar: {
        id: 2,
        text: 'bar',
      },
    },
    {
      // eslint-disable-next-line max-len
      foo: 'Consequuntur eum eveniet accusamus ea saepe. Alias occaecati eos reprehenderit expedita. Ab perferendis nemo molestias nulla est inventore voluptate.',
      /*
       *foo: 'Consequuntur eum eveniet accusamus ea saepe.',
       */
      slug: 'con',
      disabled: false,
      bar: this.obj,
      /*
       *bar: {
       *  id: 3,
       *  text: 'baz',
       *},
       */
    },
    {
      foo: 'Eligendi magni quod quas',
      slug: 'eli',
    },
    {
      foo: 'Necessitatibus corporis officiis atque sed.',
      slug: 'nec',
      disabled: true,
    },
    {
      foo: 'Baz Neque numquam reiciendis',
      slug: 'baz',
      disabled: true,
    },
    {
      foo: 'Vel eos nam porro. Vel eos nam porro.',
      slug: 'vel',
    },
    {
      foo: 'Dolores ducimus magnamomnis.',
      slug: 'dol',
    },
    {
      foo: 'Dolorem neque quae ducimus',
      slug: 'neq',
    },
    {
      foo: 'Foo2 bar baz foo bar baz foo bar baz',
      slug: 'foo2',
    },
    {
      foo: 'Bar2 Hic saepe ad sunt temporibus.',
      slug: 'bar2',
    },
    {
      foo: 'Consequuntur eum eveniet accusamus ea saepe.',
      slug: 'con2',
      disabled: true,
    },
    {
      foo: 'Eligendi2 magni quod quas',
      slug: 'eli2',
    },
    {
      foo: 'Necessitatibus2 corporis officiis atque sed.',
      slug: 'nec2',
      disabled: true,
    },
    {
      foo: 'Baz2 Neque numquam reiciendis',
      slug: 'baz2',
      disabled: true,
    },
    {
      foo: 'Vel2 eos nam porro. Vel eos nam porro.',
      slug: 'vel2',
    },
    {
      foo: 'Dolores2 ducimus magnamomnis.',
      slug: 'dol2',
    },
    {
      foo: 'Dolorem2 neque quae ducimus',
      slug: 'neq2',
    },
  ]);
  itemsWithGroups: Observable<any[]> = of([
    {
      foo: 'Foo bar baz foo bar baz foo bar baz',
      slug: 'foo',
      children: [
        {
          foo: 'Baz Neque numquam reiciendis ipsa perspiciatis voluptatem.',
          slug: 'baz',
        },
        {
          foo: 'Vel eos nam porro. Vel eos nam porro.',
          slug: 'vel',
        },
      ],
    },
    {
      foo: 'Bar Hic saepe ad adipisci totam porro sunt temporibus.',
      slug: 'bar',
      children: [
        {
          foo: 'Consequuntur eum eveniet accusamus ea saepe.',
          slug: 'con',
        },
        {
          foo: 'Eligendi magni quod quas commodi ratione necessitatibus.',
          slug: 'eli',
          disabled: true,
        },
        {
          foo: 'Necessitatibus corporis officiis atque sed.',
          slug: 'nec',
        },
      ],
    },
    {
      foo: 'Dolores ducimus magnam eius quo omnis.',
      slug: 'dol',
      disabled: true,
      children: [
        {
          foo: 'Dolorem neque quae ducimus dolore molestiae dolorem.',
          slug: 'neq',
        },
        {
          foo: 'Explicabo quos harum culpa labore aut cupiditate vero.',
          slug: 'quos',
        },
      ],
    },
  ]);
  label = 'Select a Thing';
  blank = 'none';
  multipleAllowed = true;
  myForm: FormGroup = this.formBuilder.group({
    myChoices1: [
      /*
       *this.obj,
       */
      'bar2',

      /*
       *['eli'],
       */
      /*
       *null,
       */
      /*
       *[Validators.required],
       */
    ],
    myChoices2: [
      null,
      [Validators.required],
    ],
    myChoices3: [
      null,
      [Validators.required],
    ],
  });


  myQuery$: BehaviorSubject<string> = new BehaviorSubject('');
  fakeAsync = false;

  comparator: ((f1: any, f2: any) => boolean) | null = this.compareByValue;
  firstOptions: Observable<any[]> = this.singleWithCustomTrigger;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.firstOptions = this.singleWithCustomTrigger;
  }

  ngOnInit() {
  }


  myFormatUIFn = (v: any): string => v.name;

  compareByValue(f1: any, f2: any) {
    /*
     *console.log('in compareByValue: ', f1, f2);
     */
    return f1 && f2 && f1.text === f2.text;
  }
  compareByReference(f1: any, f2: any) {
    /*
     *console.log('in compareByReference: ', f1, f2, f1 === f2);
     */
    return f1 === f2;
  }

  panelChange(e: boolean): void {
    console.log(`DEMO: Panel ${e ? 'opened' : 'closed'}`);
  }

  isChanged(e: any[]): void {
    console.log('DEMO: changed: ', e);
    this.firstOptions = this.singleWithCustomTrigger;
  }

  isSelected(v) {
    console.log('DEMO: optionSelected: ', v);
  }

  isDeselected(v) {
    console.log('DEMO: optionDeselected: ', v);
  }

  log(v: any): void {
    console.log('DEMO: Form value: ', v);
  }

  queryHasChanged(v) {
    console.log('DEMO: query string changed: ', v);
    this.myQuery$.next(v);
  }

  onFilterOptions(v) {
    console.log('DEMO: filtering options: ', v);
    if (v) {
      const regex = new RegExp(v, 'i');
      this.firstOptions = this.singleWithCustomTrigger.pipe(map(a => a.filter(i => i.slug.match(regex))));
    } else {
      this.firstOptions = this.singleWithCustomTrigger;
    }
  }

  duplicate(e) {
    console.log('DEMO: Duplicate selection: ', e);
  }

  refreshRequested() {
    console.log('DEMO: Options refresh requested!');
  }
}
