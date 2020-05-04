import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
} from '@angular/forms';
import {
  DomSanitizer,
  SafeHtml,
} from '@angular/platform-browser';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
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
  TsTableDensity,
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

/**
 * Extend the TsColumn interface with properties our component needs
 */
export interface CustomColumn extends TsColumn {
  // The UI text for the column dropdown
  display: string;
  // The associated FormControl
  control: FormControl;
  // The column name
  name: string;
  // The column width
  width: number;
}

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
  comments: string;
}

/**
 * An example database that the data source uses to retrieve data for the table.
 */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  public getRepoIssues(sort: string, order: string, page: number, perPage: number): Observable<GithubApi> {
    console.log('Hitting the GitHub API');
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
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly columnsSource: CustomColumn[] = [
    {
      display: 'Title',
      name: 'title',
      width: 300,
      control: new FormControl(true),
    },
    {
      display: 'Comments',
      name: 'comments',
      width: 100,
      control: new FormControl(false),
    },
    {
      display: 'Number',
      name: 'number',
      width: 100,
      control: new FormControl(true),
    },
    {
      display: 'Updated',
      name: 'updated',
      width: 200,
      control: new FormControl(true),
    },
    {
      display: 'State',
      name: 'state',
      width: 100,
      control: new FormControl(false),
    },
    {
      display: 'Labels',
      name: 'labels',
      width: 200,
      control: new FormControl(true),
    },
    // {
    //   display: 'Body',
    //   name: 'body',
    //   width: '260px',
    //   control: new FormControl(true),
    // },
    {
      display: 'Assignee',
      name: 'assignee',
      width: 200,
      control: new FormControl(false),
    },
    {
      display: 'ID',
      name: 'id',
      width: 100,
      control: new FormControl(true),
    },
    {
      display: 'Created',
      name: 'created',
      width: 100,
      control: new FormControl(false),
    },
    {
      display: 'View',
      name: 'html_url',
      width: 100,
      control: new FormControl(true),
    },
  ];
  public savedResponse: GithubApi | null = null;
  public useCachedData = true;
  public allPossibleColumns: CustomColumn[] = this.columnsSource.slice();
  public columnsForm = this.formBuilder.group({});
  public exampleDatabase!: ExampleHttpDao;
  public dataSource = new TsTableDataSource<GithubIssue>();
  public resultsLength = 0;
  public density: TsTableDensity = 'comfy';
  public visibleColumns: TsColumn[] = [];
  public allFormControlChanges$ = merge(...this.allPossibleColumns.map(c => c.control && c.control.valueChanges));
  public latestCreationDate = new Date(2020, 2, 23);

  @ViewChild(TsSortDirective, { static: true })
  public sort!: TsSortDirective;

  @ViewChild(TsPaginatorComponent, { static: true })
  public readonly paginator!: TsPaginatorComponent;

  @ViewChild('myTable', { static: false })
  public readonly myTable!: TsTableComponent;


  constructor(
    private domSanitizer: DomSanitizer,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.setVisibleColumns();
  }

  public ngAfterViewInit(): void {
    this.setUpTable();

    this.allFormControlChanges$.pipe(untilComponentDestroyed(this)).subscribe(change => {
      this.setVisibleColumns();
    });
  }

  // NOTE: Needed for untilComponentDestroyed
  public ngOnDestroy(): void {}

  public setVisibleColumns(): void {
    this.visibleColumns = this.allPossibleColumns.filter(c => c.control && c.control.value);
    console.log('DEMO: setVisibleColumns', this.visibleColumns);
  }

  /**
   * Set up the database, sorting and API calls
   */
  public setUpTable(): void {
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
          // console.log('Demo: fetched data: ', data);
          this.savedResponse = data;
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

  /**
   * Sanitize HTML content before injecting it
   *
   * @param content - The HTML to sanitize
   * @returns The safe HTML
   */
  public sanitize(content): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }

  /**
   * Reorder columns list when a list item is dropped
   *
   * @param event - The drop event
   */
  public columnDropped(event: CdkDragDrop<string[]>): void {
    const columns = this.allPossibleColumns.slice();
    moveItemInArray(columns, event.previousIndex, event.currentIndex);

    this.allPossibleColumns = columns;
    this.setVisibleColumns();
    this.changeDetectorRef.detectChanges();
  }

  public trackBy(index: number, item: GithubIssue): string {
    return item.number;
  }


  // Log functions for Demo purposes

  public perPageChange(e: number): void {
    console.log('DEMO: Records per page changed: ', e);
  }

  public onPageSelect(e: TsPaginatorMenuItem): void {
    console.log('DEMO: Page selected: ', e);
  }

  public columnsChange(e: TsTableColumnsChangeEvent): void {
    // NOTE: Commented out due to the volume - uncomment as needed for demo purposes.
    console.log('DEMO: Columns change: ', e);
  }

  public log() {
    console.log('Demo: columns: ', this.myTable.columns);
  }

}
