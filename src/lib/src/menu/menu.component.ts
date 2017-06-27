import {
  Component,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import _find = require('lodash/find')

import { MenuPositionTypesX } from './menu-position-x.types';
import { MenuPositionTypesY } from './menu-position-y.types';

export interface MenuItem {
  name: string;
  icon: string;
  action: string;
}

/**
 * A presentational component to render a dropdown menu.
 * TODO: Add example
 *
 * @example
 * <ts-menu
 *   foo="bar"
 * ></ts-menu>
 */
@Component({
  selector: 'ts-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class TsMenuComponent implements OnInit  {
  /**
   * Define if there is at least one icon
   */
  public hasIcons: boolean = false;

  /**
   * Define the menu ID
   */
  public menuId: string = this.randomId();

  /**
   * Define if the menu should overlap the trigger
   */
  public shouldOverlapTrigger: boolean = true;

  /**
   * Provide access to the model
   */
  @ViewChild('tsMenu') menu: any;

  /**
   * Accept an array of menu items to display
   */
  @Input() menuItems: MenuItem[] = [
    {
      name: 'Item 1',
      icon: 'build',
      action: 'foobar',
    },
    {
      name: 'Item 2',
      icon: null,
      action: 'barbaz',
    },
    {
      name: 'Item 3',
      icon: 'announcement',
      action: 'bing',
    },
  ];

  /**
   * Define the X menu position
   */
  @Input() menuPositionX: MenuPositionTypesX = 'after';

  /**
   * Define the Y menu position
   */
  @Input() menuPositionY: MenuPositionTypesY = 'below';


  // TODO: Output selection



  ngOnInit() {
    console.log('this.menu: ', this.menu);
    console.log('this.menuId: ', this.menuId);

    this.hasIcons = this._hasAtLeastOneIcon(this.menuItems);
  }


  /**
   * Generate a random string for an ID
   *
   * @return {string} ID A random ID string
   */
  private randomId(): string {
    return Math.random().toString(36).substr(2, 10);
  }


  /**
   * Determine if at least one item has a non-null icon
   *
   * @return {boolean} hasIcon Value that represents if at least one icon is present
   */
  private _hasAtLeastOneIcon(items: MenuItem[]): boolean {
    const found = _find(items, (item: MenuItem) => {
      return item.icon;
    });

    return found ? true : false;
  }
}

