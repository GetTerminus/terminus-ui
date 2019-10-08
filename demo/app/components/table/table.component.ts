import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ViewChild,
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser';
import {
  TsPaginatorComponent,
  TsPaginatorMenuItem,
} from '@terminus/ui/paginator';
import { TsSortDirective } from '@terminus/ui/sort';
import {
  TsColumn,
  TsTableColumnsChangeEvent,
  TsTableComponent,
  TsTableDataSource,
} from '@terminus/ui/table';
import {
  merge,
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';


export interface TableItem {
  username: string;
  age: number;
  title: string;
  active: boolean;
  visible: boolean;
}

const COLUMNS_SOURCE_GITHUB = [
  {
    name: 'Updated',
    value: 'updated',
  },
  {
    name: 'Number',
    value: 'number',
  },
  {
    name: 'State',
    value: 'state',
  },
  {
    name: 'Title',
    value: 'title',
  },
  {
    name: 'Body',
    value: 'body',
  },
  {
    name: 'Labels',
    value: 'labels',
  },
  {
    name: 'Comments',
    value: 'comments',
  },
  {
    name: 'Assignee',
    value: 'assignee',
  },
  {
    name: 'ID',
    value: 'id',
  },
  {
    name: 'Created',
    value: 'created',
  },
];

export interface GithubApi {
  items: GithubIssue[];
  // NOTE: Format controlled by GitHub
  // eslint-disable-next-line camelcase
  total_count: number;
}

export interface GithubIssue {
  // NOTE: Format controlled by GitHub
  // eslint-disable-next-line camelcase
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

  public getRepoIssues(sort: string, order: string, page: number, perPage: number): Observable<GithubApi> {
    console.log('HITTING GITHUB');
    const href = `https://api.github.com/search/issues`;
    const requestUrl = `${href}?q=repo:GetTerminus/terminus-ui`;
    const requestParams = `&sort=${sort}&order=${order}&page=${page + 1}&per_page=${perPage}`;
    return this.http.get<GithubApi>(`${requestUrl}${requestParams}`);
  }
}


@Component({
  selector: 'demo-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  public allColumns = COLUMNS_SOURCE_GITHUB.slice(0);
  public savedResponse: GithubApi | null = null;
  public useCachedData = true;
  public displayedColumns = [
    'title',
    'updated',
    'comments',
    'assignee',
    'number',
    'labels',
    'created',
    'body',
    'id',
    'html_url',
  ];
  public exampleDatabase!: ExampleHttpDao;
  public dataSource = new TsTableDataSource<GithubIssue>();
  public resultsLength = 0;
  public resizableColumns: TsColumn[] = [
    {
      name: 'title',
      width: '400px',
    },
    { name: 'number' },
    {
      name: 'updated',
      // width: '300px',
    },
    // { name: 'comments' },
    // {
    //   name: 'assignee',
    //   width: '160px',
    // },
    {
      name: 'labels',
      // width: '260px',
    },
    // { name: 'created' },
    // { name: 'id' },
    {
      name: 'body',
      // width: '500px',
    },
    { name: 'html_url' },
  ];

  @ViewChild(TsSortDirective, { static: true })
  public sort!: TsSortDirective;

  @ViewChild(TsPaginatorComponent, { static: true })
  public readonly paginator!: TsPaginatorComponent;

  @ViewChild('myTable', { static: false })
  public readonly myTable!: TsTableComponent;

  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
  ) {}


  public ngAfterViewInit(): void {
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
          if (this.useCachedData && this.savedResponse && this.savedResponse.items) {
            return of(this.savedResponse);
          }

          return this.exampleDatabase.getRepoIssues(
            this.sort.active,
            this.sort.direction,
            this.paginator.currentPageIndex,
            this.paginator.recordsPerPage,
          );
        }),
        map(data => {
          console.log('Demo: fetched data: ', data);
          this.savedResponse = data as GithubApi;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          console.warn('GitHub API rate limit has been reached!');
          return of([]);
        }),
      ).subscribe(data => {
        this.dataSource.data = data;
      });
  }

  public clearCachedData(): void {
    this.savedResponse = null;
  }

  public perPageChange(e: number): void {
    console.log('DEMO: Records per page changed: ', e);
  }

  public onPageSelect(e: TsPaginatorMenuItem): void {
    console.log('DEMO: Page selected: ', e);
  }

  public columnsChange(e: TsTableColumnsChangeEvent): void {
    console.log('DEMO: Columns change: ', e);
  }

  public sanitize(content): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }

  public log() {
    console.log('Demo: columns: ', this.myTable.columns);
  }

}
