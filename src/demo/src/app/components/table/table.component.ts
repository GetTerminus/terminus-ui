import {
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';
import { Observable } from 'rxjs/Observable';

import {
  TsTableDataSource,
  TsSortDirective,
  TsPaginatorComponent,
  TsPaginatorMenuItem,
} from '@terminus/ui';


export interface TableItem {
  username: string;
  age: number;
  title: string;
  active: boolean;
  visible: boolean;
}

const DATA_MOCK: TableItem[] = [
  {
    username: 'foo',
    age: 12,
    title: 'foo title',
    active: true,
    visible: true,
  },
  {
    username: 'bar',
    age: 34,
    title: 'bar title',
    active: true,
    visible: false,
  },
  {
    username: 'baz',
    age: 22,
    title: 'baz title',
    active: true,
    visible: true,
  },
  {
    username: 'bing',
    age: 47,
    title: 'bing title',
    active: false,
    visible: true,
  },
  {
    username: 'boom',
    age: 111,
    title: 'boom title',
    active: false,
    visible: false,
  },
  {
    username: 'bang',
    age: 61,
    title: 'bang title',
    active: true,
    visible: false,
  },
];

const COLUMNS_SOURCE = [
  {
    name: 'Username',
    value: 'username',
  },
  {
    name: 'Age',
    value: 'age',
  },
  {
    name: 'Title',
    value: 'title',
  },
  {
    name: 'Is Active',
    value: 'active',
  },
  {
    name: 'Is Visible',
    value: 'visible',
  },
];

const COLUMNS_SOURCE_GITHUB = [
  {
    name: 'Created',
    value: 'created',
  },
  {
    name: 'Title',
    value: 'title',
  },
  {
    name: 'Comments',
    value: 'comments',
  },
  {
    name: 'State',
    value: 'state',
  },
  {
    name: 'Number',
    value: 'number',
  },
];

@Component({
  selector: 'demo-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements AfterViewInit {
  allColumns = COLUMNS_SOURCE_GITHUB.slice(0);
  displayedColumns = [
    'created',
    'number',
    'title',
    'state',
    'comments',
  ];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new TsTableDataSource();
  resultsLength = 0;

  @ViewChild(TsSortDirective)
  sort: TsSortDirective;

  @ViewChild(TsPaginatorComponent)
  paginator: TsPaginatorComponent;


  constructor(
    private http: HttpClient,
  ) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.paginator.currentPageIndex = 0;
    });

    // Fetch new data anytime the sort is changed, the page is changed, or the records shown per
    // page is changed
    merge(this.sort.sortChange, this.paginator.pageSelect, this.paginator.recordsPerPageChange)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.exampleDatabase.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.currentPageIndex,
            this.paginator.recordsPerPage,
          );
        }),
        map(data => {
          console.log('Demo: fetched data: ', data)
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          console.warn('GitHub API rate limit has been reached!')
          return of([]);
        })
      ).subscribe(data => {
        this.dataSource.data = data;
      });
  }


  perPageChange(e: number) {
    console.log('DEMO records per page changed: ', e);
  }

  onPageSelect(e: TsPaginatorMenuItem) {
    console.log('DEMO page selected: ', e);
  }

  first(e: any) {
    console.log('DEMO first: ', e);
  }

  previous(e: any) {
    console.log('DEMO previous: ', e);
  }

  next(e: any) {
    console.log('DEMO next: ', e);
  }

  last(e: any) {
    console.log('DEMO last: ', e);
  }




}


export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/**
 * An example database that the data source uses to retrieve data for the table.
 */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number, perPage: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:GetTerminus/terminus-ui`;
    const requestParams = `&sort=${sort}&order=${order}&page=${page + 1}&per_page=${perPage}`;

    return this.http.get<GithubApi>(`${requestUrl}${requestParams}`);
  }
}
