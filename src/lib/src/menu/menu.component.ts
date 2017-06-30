import {
  Component,
  Input,
  Output,
  ViewChild,
  OnInit,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdMenuTrigger } from '@angular/material';
import { find } from 'lodash';

const _ = {
  find: find,
};

import { MenuPositionTypesX } from './menu-position-x.types';
import { MenuPositionTypesY } from './menu-position-y.types';
import { MenuItem } from './menu-item.interface';


/**
 * A presentational component to render a dropdown menu.
 *
 * @example
 * <ts-menu
 *              menuItems="[{},{},{}]"
 *              menuPositionX="20px"
 *              menuPositionY="20px"
 *              isDisabled="false"
 *              (selected)="myMethod($event)"
 * >Select Item</ts-menu>
 */
@Component({
  selector: 'ts-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class TsMenuComponent implements OnInit, AfterViewInit {
  /**
   * Define if there is at least one icon
   */
  public hasIcons: boolean = false;

  /**
   * Define if the menu should overlap the trigger
   */
  public shouldOverlapTrigger: boolean = false;

  /**
   * Provide access to the trigger
   */
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  /**
   * Define if the menu should be opened by default
   */
  @Input() defaultOpened: boolean = false;

  /**
   * Define if the menu should be disabled
   */
  @Input() isDisabled: boolean = false;

  /**
   * Accept an array of menu items to display
   */
  @Input() menuItems: MenuItem[];

  /**
   * Define the X menu position
   */
  @Input() menuPositionX: MenuPositionTypesX = 'after';

  /**
   * Define the Y menu position
   */
  @Input() menuPositionY: MenuPositionTypesY = 'below';

  /**
   * Output a selection event with the item payload
   */
  @Output() selected = new EventEmitter<MenuItem>();


  /**
   * On initialization check to see if at least 1 icon exists in the menu items
   */
  ngOnInit(): void {
    this.hasIcons = this._hasAtLeastOneIcon(this.menuItems);
  }


  /**
   * After the view has initialized, open the menu if it is defaulted to 'open'
   */
  ngAfterViewInit(): void {
    if (this.defaultOpened) {
      this.trigger.openMenu();
    }
  }


  /**
   * Determine if at least one item has a non-null icon
   *
   * @param {Array} items The collection of items to look through
   * @return {Boolean} hasIcon Value that represents if at least one icon is present
   */
  private _hasAtLeastOneIcon(items: MenuItem[]): boolean {
    const found = _.find(items, (item: MenuItem) => {
      return item.icon;
    });

    return found ? true : false;
  }
}

