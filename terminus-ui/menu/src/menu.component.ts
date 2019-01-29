import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  isDevMode,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TsButtonFormatTypes } from '@terminus/ui/button';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import { coerceBooleanProperty } from '@terminus/ngx-tools/coercion';
import { isBoolean } from '@terminus/ngx-tools';


/**
 * Define the allowed X positions for a menu
 */
export type TsMenuPositionTypesX =
  'before'
  | 'after'
;


/**
 * Define the allowed Y positions for a menu
 */
export type TsMenuPositionTypesY =
  'above'
  | 'below'
;


/**
 * Define the allowed trigger types for a menu
 */
export type TsMenuTriggerTypes
  = 'default'
  | 'utility'
;


/**
 * A presentational component to render a dropdown menu.
 *
 * #### QA CSS CLASSES
 * -`qa-menu`: Placed on the wrapper around the menu items
 * -`qa-menu-trigger`: Placed on the menu trigger
 *
 * @example
 * <ts-menu
 *              [defaultOpened]="false"
 *              [isDisabled]="false"
 *              [menuItemsTemplate]="myTemplate"
 *              menuPositionX="20px"
 *              menuPositionY="20px"
 *              theme="accent"
 *              triggerType="utility"
 *              (selected)="myMethod($event)"
 * >Select Item</ts-menu>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    class: 'ts-menu',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsMenu',
})
export class TsMenuComponent implements AfterViewInit, OnInit {
  /**
   * Define the default icon for the trigger button
   */
  private TRIGGER_ICON_DEFAULT: 'arrow_drop_down' = 'arrow_drop_down';

  /**
   * Define the utility icon for the trigger button
   */
  private TRIGGER_ICON_UTILITY: 'more_vert' = 'more_vert';

  /**
   * Return if the current menu is a utility menu
   */
  public get isUtilityMenu(): boolean {
    return this.triggerType === 'utility';
  }

  /**
   * Define if the menu should overlap the trigger
   */
  public shouldOverlapTrigger = false;

  /**
   * The icon to be used in the trigger button
   */
  public triggerIcon!: 'arrow_drop_down' | 'more_vert';

  /**
   * Provide access to the trigger
   */
  @ViewChild(MatMenuTrigger)
  public trigger!: MatMenuTrigger;

  /**
   * Define if the menu should be opened by default
   */
  @Input()
  public set defaultOpened(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsMenuComponent: "defaultOpened" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._defaultOpened = coerceBooleanProperty(value);
  }
  public get defaultOpened(): boolean {
    return this._defaultOpened;
  }
  private _defaultOpened = false;

  /**
   * Define if the menu should be disabled
   */
  @Input()
  public set isDisabled(value: boolean) {
    /* istanbul ignore if */
    if (!isBoolean(value) && value && isDevMode()) {
      console.warn(`TsMenuComponent: "isDisabled" value is not a boolean. ` +
      `String values of 'true' and 'false' will no longer be coerced to a true boolean with the next release.`);
    }
    this._isDisabled = coerceBooleanProperty(value);
  }
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * Allow a custom template for menu items
   */
  @Input()
  public menuItemsTemplate!: TemplateRef<ElementRef>;

  /**
   * Define the X menu position
   */
  @Input()
  public menuPositionX: TsMenuPositionTypesX = 'after';

  /**
   * Define the Y menu position
   */
  @Input()
  public menuPositionY: TsMenuPositionTypesY = 'below';

  /**
   * Define the menu theme
   */
  @Input()
  public theme: TsStyleThemeTypes = 'primary';

  /**
   * Define the button format
   */
  @Input()
  public format: TsButtonFormatTypes = 'filled';

  /**
   * Define the type of trigger {@link TsMenuTriggerTypes}
   *
   * - 'utility' will expose a simple fab trigger: `⋮`
   * - 'default' will expose a standard {@link TsButtonComponent}
   */
  @Input()
  public triggerType: TsMenuTriggerTypes = 'default';


  /**
   * Set the triggerIcon based on the triggerType
   */
  ngOnInit(): void {
    this.triggerIcon = (this.triggerType === 'default') ?
      this.TRIGGER_ICON_DEFAULT : this.TRIGGER_ICON_UTILITY;
  }


  /**
   * After the view has initialized, open the menu if it is defaulted to 'open'
   */
  public ngAfterViewInit(): void {
    if (this.defaultOpened) {
      this.trigger.openMenu();
    }
  }

}
