import {
  Component,
  OnInit,
  VERSION as NG_VERSION,
} from '@angular/core';
import { Router } from '@angular/router';
import { VERSION as MAT_VERSION } from '@angular/material';
import { VERSION as UI_VERSION } from '@terminus/ui';
import { VERSION as NGX_VERSION } from '@terminus/ngx-tools';
import { componentsList } from './components.constant';

import { orderArrayByProperty } from './../utilities/orderArrayByProperty';


@Component({
  selector: 'demo-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  components = orderArrayByProperty(componentsList, 'path');
  title = `Components (${this.components.length})`;
  height = '100px';
  path = '';
  uiVersion = UI_VERSION;
  ngxVersion = NGX_VERSION;
  ngVersion = NG_VERSION;
  matVersion = MAT_VERSION;

  constructor(
    private router: Router,
  ) {}


  ngOnInit() {
    this.setCurrentPage();
  }


  /**
   * Set the menu to the current page
   */
  setCurrentPage(): void {
    const routeParts = this.router.routerState.snapshot.url.split('/');
    if (routeParts.length > 2) {
      this.path = routeParts[routeParts.length - 1];
    }
  }

}
