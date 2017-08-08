import {
  Component,
  Input,
  Output,
  ViewChild,
  OnInit,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { MdMenuTrigger } from '@angular/material';

import { MenuPositionTypesX } from './menu-position-x.types';
import { MenuPositionTypesY } from './menu-position-y.types';
import { MenuItem } from './menu-item.interface';
import { TsStyleThemeTypes } from './../types/style-theme.types';


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
  @ViewChild(MdMenuTrigger)
  private trigger: MdMenuTrigger;

  /**
   * Define if the menu should be opened by default
   */
  @Input()
  private defaultOpened: boolean = false;

  /**
   * Define if the menu should be disabled
   */
  @Input()
  public isDisabled: boolean = false;

  /**
   * Accept an array of menu items to display
   */
  @Input()
  public menuItems: MenuItem[];

  /**
   * Define the X menu position
   */
  @Input()
  public menuPositionX: MenuPositionTypesX = 'after';

  /**
   * Define the Y menu position
   */
  @Input()
  public menuPositionY: MenuPositionTypesY = 'below';

  /**
   * Define the menu theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Output a selection event with the item payload
   */
  @Output()
  public selected: EventEmitter<MenuItem> = new EventEmitter();


  /**
   * On initialization check to see if at least 1 icon exists in the menu items
   */
  public ngOnInit(): void {
    this.hasIcons = this.hasAtLeastOneIcon(this.menuItems);
  }


  /**
   * After the view has initialized, open the menu if it is defaulted to 'open'
   */
  public ngAfterViewInit(): void {
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
  private hasAtLeastOneIcon(items: MenuItem[]): boolean {
    if (!items || items.length < 1) {
      return false;
    }

    const found: any = items.find((item: MenuItem) => {
      return item.icon ? true : false;
    });

    return found ? true : false;
  }
}

