import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { componentsList } from './components.constant';
import { orderArrayByProperty } from './../utilities/orderArrayByProperty';

@Component({
  selector: 'demo-components',
  templateUrl: './components.component.html',
})
export class ComponentsComponent implements OnInit {
  components = orderArrayByProperty(componentsList, 'path');
  title = `Components (${this.components.length})`;
  height = '100px';
  path = '';


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
