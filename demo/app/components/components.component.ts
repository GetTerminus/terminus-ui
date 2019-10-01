import {
  Component,
  OnInit,
  VERSION as NG_VERSION,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { VERSION as MAT_VERSION } from '@angular/material';
import {
  NavigationEnd, Route,
  Router,
  Routes,
} from '@angular/router';
import {
  untilComponentDestroyed,
  VERSION as NGX_VERSION,
} from '@terminus/ngx-tools/utilities';
import { TsSelectionListChange } from '@terminus/ui/selection-list';
import { VERSION as UI_VERSION } from '@terminus/ui/utilities';
import {
  BehaviorSubject, Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { orderArrayByProperty } from './../utilities/orderArrayByProperty';
import { componentsList } from './components.constant';


@Component({
  selector: 'demo-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  public components = orderArrayByProperty(componentsList, 'path');
  public path = '';
  public uiVersion = UI_VERSION;
  public ngxVersion = NGX_VERSION;
  public ngVersion = NG_VERSION;
  public matVersion = MAT_VERSION;
  public currentPage = new FormControl();
  public formatter = v => v.data.name;
  public query$ = new BehaviorSubject('');
  public simpleResults$: Observable<Route[]> | undefined;

  constructor(
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.setCurrentPage();

    // Update the navigation menu
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setCurrentPage();
        }
      });

    // Wire up selection list search
    this.simpleResults$ = this.query$
      .pipe(
        untilComponentDestroyed(this),
        map(query => this.queryComponents(query)),
      );

  }

  public ngOnDestroy(): void {}

  /**
   * Pass the query change to our search
   */
  public queryHasChanged(query: string): void {
    console.log('queryHasChanged: ', query);
    this.query$.next(query);
  }

  /**
   * Set the menu to the current page
   */
  public setCurrentPage(): void {
    const routeParts = this.router.routerState.snapshot.url.split('/');
    if (routeParts.length > 2) {
      this.path = routeParts[routeParts.length - 1];
    }

    const page = this.components.filter((v: any) => v.path === this.path)[0];

    if (page) {
      this.currentPage.setValue([page]);
    }
  }

  /**
   * Navigate to the selected page
   */
  public pageSelected(page: TsSelectionListChange): void {
    this.router.navigate(['/', 'components', (page.value as Routes)[0].path]);
  }

  /**
   * Query for components from the primary list
   */
  private queryComponents(query: string): Route[] {
    query = query.toLowerCase();
    console.warn('queryComponents: ', query);

    if (query) {
      const letters = query.split('').map(l => `${l}.*`).join('');
      const regex = new RegExp(letters, 'ig');
      return this.components.filter(s => !!s.data.name.match(regex));
    }
    return this.components.slice();
  }

}
