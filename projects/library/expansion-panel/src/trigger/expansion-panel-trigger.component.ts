import {
  FocusableOption,
  FocusMonitor,
  FocusOrigin,
} from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Inject,
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import {
  EMPTY,
  merge,
} from 'rxjs';
import { filter } from 'rxjs/operators';

import { tsExpansionPanelAnimations } from '../expansion-animations';
import {
  TS_EXPANSION_PANEL_DEFAULT_OPTIONS,
  TsExpansionPanelComponent,
  TsExpansionPanelDefaultOptions,
} from '../expansion-panel.component';


/**
 * Trigger to open/close a {@link TsExpansionPanelComponent}
 *
 * @example
 * <ts-expansion-panel>
 *               <ts-expansion-panel-trigger
 *                 collapsedHeight="100px"
 *                 expandedHeight="150px"
 *               >
 *                 Panel trigger
 *               </ts-expansion-panel-trigger>
 *
 *               Panel content
 * </ts-expansion-panel>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/expansion-panel</example-url>
 */
@Component({
  animations: [
    tsExpansionPanelAnimations.indicatorRotate,
    tsExpansionPanelAnimations.expansionTriggerHeight,
  ],
  selector: 'ts-expansion-panel-trigger',
  styleUrls: ['./expansion-panel-trigger.component.scss'],
  templateUrl: './expansion-panel-trigger.component.html',
  host: {
    'class': 'ts-expansion-panel__trigger',
    'role': 'button',
    '[attr.id]': 'panel.triggerId',
    '[attr.tabindex]': 'disabled ? -1 : 0',
    '[attr.aria-controls]': 'panel.id',
    '[attr.aria-expanded]': 'isExpanded',
    '[attr.aria-disabled]': 'panel.disabled',
    '[class.ts-expansion-panel__trigger--expanded]': 'isExpanded',
    '[class.ts-expansion-panel__trigger--transparent]': 'isTransparent',
    '(click)': 'toggle()',
    '(keydown)': 'keydown($event)',
    '[@expansionHeight]': `{
      value: currentPanelExpandedState,
      params: {
        collapsedHeight: collapsedHeight,
        expandedHeight: expandedHeight
      }
    }`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsExpansionPanelTrigger',
})
export class TsExpansionPanelTriggerComponent implements OnDestroy, FocusableOption {
  /**
   * Determine the current expanded state string of the panel
   */
  public get currentPanelExpandedState(): string {
    return this.panel.currentExpandedState;
  }

  /**
   * Determine if the panel is currently expanded
   */
  public get isExpanded(): boolean {
    return this.panel.expanded;
  }

  /**
   * Determine if current mode is transparent
   */
  public get isTransparent(): boolean {
    return this.panel.transparentMode;
  }

  /**
   * Whether the associated panel is disabled.
   *
   * Implemented as a part of `FocusableOption`.
   */
  public get disabled(): boolean {
    return this.panel.disabled;
  }

  /** Gets whether the expand indicator should be shown. */
  public get shouldShowToggle(): boolean {
    return !this.panel.hideToggle && !this.panel.disabled;
  }

  /**
   * Height of the trigger while the panel is collapsed
   */
  @Input()
  public collapsedHeight: string | undefined;

  /**
   * Height of the trigger while the panel is expanded
   */
  @Input()
  public expandedHeight: string | undefined;


  constructor(
    @Host() public panel: TsExpansionPanelComponent,
    private elementRef: ElementRef,
    private focusMonitor: FocusMonitor,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(TS_EXPANSION_PANEL_DEFAULT_OPTIONS) @Optional() defaultOptions?: TsExpansionPanelDefaultOptions,
  ) {
    const accordionHideToggleChange =
      panel.accordion
        // NOTE: Underscore naming controlled by Material
        // eslint-disable-next-line no-underscore-dangle
        ? panel.accordion._stateChanges.pipe(filter(changes => !!changes.hideToggle))
        : EMPTY;

    // Since the toggle state depends on an @Input on the panel, we need to subscribe and trigger change detection manually.
    // eslint-disable-next-line deprecation/deprecation
    merge(
      panel.opened, panel.closed, accordionHideToggleChange,
      panel.inputChanges.pipe(filter(changes => !!(changes.hideToggle || changes.disabled))),
    ).pipe(
      untilComponentDestroyed(this),
    )
      .subscribe(() => this.changeDetectorRef.markForCheck());

    // Avoid focus being lost if the panel contained the focused element and was closed.
    panel.closed.pipe(
      filter(() => panel.contentContainsFocus),
      untilComponentDestroyed(this),
    ).subscribe(() => focusMonitor.focusVia(elementRef, 'program'));

    // Subscribe to trigger focus events
    focusMonitor.monitor(elementRef).subscribe(origin => {
      if (origin && panel.accordion) {
        panel.accordion.handleTriggerFocus(this);
      }
    });

    // Set the default options if they exist
    if (defaultOptions) {
      this.expandedHeight = defaultOptions.expandedHeight;
      this.collapsedHeight = defaultOptions.collapsedHeight;
    }
  }

  /**
   * Stop monitoring focus events
   */
  public ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  /**
   * Focuses the panel trigger.
   *
   * Implemented as a part of `FocusableOption`.
   *
   * @param origin - Origin of the action that triggered the focus.
   */
  public focus(origin: FocusOrigin = 'program'): void {
    this.focusMonitor.focusVia(this.elementRef, origin);
  }

  /**
   * Toggle the expanded state of the panel
   */
  public toggle(): void {
    this.panel.toggle();
  }

  /**
   * Handle keydown event calling to toggle() if appropriate
   *
   * @param event
   */
  public keydown(event: KeyboardEvent): void {
    const { code } = event;
    const isSelectionKey = (code === KEYS.SPACE.code) || (code === KEYS.ENTER.code);

    if (isSelectionKey) {
      // istanbul ignore else
      if (!hasModifierKey(event)) {
        event.preventDefault();
        this.toggle();
      }
    } else if (this.panel.accordion) {
      this.panel.accordion.handleTriggerKeydown(event);
    }
  }
}
