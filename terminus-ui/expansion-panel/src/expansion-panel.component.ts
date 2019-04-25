import { AnimationEvent } from '@angular/animations';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import {
  TsDocumentService,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import { Subject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  startWith,
  take,
} from 'rxjs/operators';

import {
  TS_ACCORDION, TsAccordionBase,
} from './accordion/accordion-base';
import { tsExpansionPanelAnimations } from './expansion-animations';
import { TsExpansionPanelContentDirective } from './expansion-panel-content.directive';


/**
 * The possible states for a {@link TsExpansionPanelComponent}
 */
export type TsExpansionPanelState = 'expanded' | 'collapsed';


/**
 * Object that can be used to override the default options for all of the expansion panels in a module.
 */
export interface TsExpansionPanelDefaultOptions {
  /**
   * Height of the trigger while the panel is expanded
   */
  expandedHeight: string;

  /**
   * Height of the trigger while the panel is collapsed
   */
  collapsedHeight: string;

  /**
   * Whether the toggle indicator should be hidden
   */
  hideToggle: boolean;
}


/**
 * Injection token that can be used to configure the defalt options for the expansion panel component.
 */
export const TS_EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken<TsExpansionPanelDefaultOptions>('TS_EXPANSION_PANEL_DEFAULT_OPTIONS');

/**
 * Unique ID for each panel trigger ID
 */
let nextUniqueId = 0;


/**
 * An expansion panel component to show/hide content
 *
 * @example
 * <ts-expansion-panel
 *               [hideToggle]="true"
 *               [isExpanded]="true"
 *               [isDisabled]="true"
 *               (opened)="panelOpened()"
 *               (closed)="panelClosed()"
 *               (expandedChange)="panelStateChanged($event)"
 *               (destroyed)="componentDestroyed()"
 *               (afterCollapse)="collapseAnimationDone"
 *               (afterExpand)="expandAnimationDone()"
 * >
 *               <ts-expansion-panel-trigger>
 *                 Panel trigger
 *               </ts-expansion-panel-trigger>
 *
 *               Panel content
 * </ts-expansion-panel>
 *
 * <example-url>https://getterminus.github.io/ui-demos-master/components/expansion-panel</example-url>
 */
@Component({
  selector: 'ts-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  // NOTE: @Outputs are defined here rather than using decorators since we are extending the @Outputs of the base class
  // tslint:disable-next-line:no-outputs-metadata-property
  outputs: [
    'opened',
    'closed',
    'expandedChange',
    'destroyed',
  ],
  animations: [tsExpansionPanelAnimations.bodyExpansion],
  host: {
    'class': 'ts-expansion-panel',
    '[class.ts-expansion-panel--expanded]': 'expanded',
    '[class.ts-expansion-panel--animation-noopable]': 'animationMode === "NoopAnimations"',
  },
  providers: [
    // Provide TsAccordionComponent as undefined to prevent nested expansion panels from registering to the same accordion.
    {
      provide: TS_ACCORDION,
      useValue: undefined,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsExpansionPanel',
})
export class TsExpansionPanelComponent extends CdkAccordionItem implements AfterContentInit, OnChanges, OnDestroy {
  /**
   * Stream of body animation done events
   */
  public bodyAnimationDone = new Subject<AnimationEvent>();

  /**
   * A stored reference to the document
   */
  private document: Document;

  /**
   * The ID for the associated trigger element. Used for a11y labelling.
   */
  public triggerId = `ts-expansion-panel-trigger-${nextUniqueId++}`;

  /**
   * Portal holding the user's content
   */
  public portal: TemplatePortal | undefined;

  /**
   * Stream that emits for changes in `@Input` properties
   */
  public readonly inputChanges = new Subject<SimpleChanges>();

  /**
   * Optionally defined accordion the expansion panel belongs to
   *
   * NOTE: This should be `TsAccordionBase | undefined` but the underlying class doesn't define it as possibly undefined so we cannot
   * do so here.
   */
  public accordion: TsAccordionBase;

  /**
   * Get the current expanded state
   */
  public get currentExpandedState(): TsExpansionPanelState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  /**
   * Determine whether the expansion panel's content contains the currently-focused element
   */
  public get contentContainsFocus(): boolean {
    if (this.panelBody && this.document) {
      const focusedElement = this.document.activeElement;
      const bodyElement = this.panelBody.nativeElement;
      return focusedElement === bodyElement || bodyElement.contains(focusedElement);
    }

    return false;
  }

  /**
   * Reference to a passed in template (for lazy loading)
   */
  @ContentChild(TsExpansionPanelContentDirective)
  public lazyContent!: TsExpansionPanelContentDirective;

  /**
   * The element containing the panel's user-provided content
   */
  @ViewChild('panelBody')
  public panelBody!: ElementRef<HTMLElement>;

  /**
   * Determine if the toggle indicator should be hidden
   */
  @Input()
  public set hideToggle(value: boolean) {
    this._hideToggle = value;
  }
  public get hideToggle(): boolean {
    return this._hideToggle || (this.accordion && this.accordion.hideToggle);
  }
  private _hideToggle = false;

  /**
   * Define if the panel should be disabled
   *
   * NOTE: CdkAccordionItem defines an input called `disabled`.
   * This alias is to conform to our existing naming convention.
   */
  @Input()
  public set isDisabled(value: boolean) {
    this.disabled = value;
  }
  public get isDisabled(): boolean {
    return this.disabled;
  }

  /**
   * Define if the panel should be open
   *
   * NOTE: CdkAccordionItem defines an input called `expanded`.
   * This alias is to conform to our existing naming convention.
   */
  @Input()
  public set isExpanded(value: boolean) {
    this.expanded = value;
  }
  public get isExpanded(): boolean {
    return this.expanded;
  }

  /**
   * The event emitted after the panel body's expansion animation finishes
   */
  @Output()
  public readonly afterExpand: EventEmitter<void> = new EventEmitter();

  /**
   * The event emitted after the panel body's collapse animation finishes
   */
  @Output()
  public readonly afterCollapse: EventEmitter<void> = new EventEmitter();


  constructor(
    @Optional() @SkipSelf() @Inject(TS_ACCORDION) accordion: TsAccordionBase,
      _changeDetectorRef: ChangeDetectorRef,
      _uniqueSelectionDispatcher: UniqueSelectionDispatcher,
    private _viewContainerRef: ViewContainerRef,
    private documentService: TsDocumentService,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public animationMode?: string,
    @Inject(TS_EXPANSION_PANEL_DEFAULT_OPTIONS) @Optional() defaultOptions?: TsExpansionPanelDefaultOptions,
  ) {
    super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);

    this.accordion = accordion;
    this.document = documentService.document;

    // We need a Subject with distinctUntilChanged, because the `done` event fires twice on some browsers.
    // See https://github.com/angular/angular/issues/24084
    this.bodyAnimationDone.pipe(
      untilComponentDestroyed(this),
      distinctUntilChanged((x, y) => x.fromState === y.fromState && x.toState === y.toState),
    ).subscribe(event => {
      // istanbul ignore else
      if (event.fromState !== 'void') {
        if (event.toState === 'expanded') {
          this.afterExpand.emit();
        } else if (event.toState === 'collapsed') {
          this.afterCollapse.emit();
        }
      }
    });

    if (defaultOptions) {
      this.hideToggle = defaultOptions.hideToggle;
    }
  }


  /**
   * If a lazy-loaded template exists, inject it after the panel is opened
   */
  public ngAfterContentInit(): void {
    // istanbul ignore else
    if (this.lazyContent) {
      // Render the content as soon as the panel becomes open.
      this.opened.pipe(
        // tslint:disable: no-non-null-assertion
        startWith<void>(null!),
        // tslint:enable: no-non-null-assertion
        filter(() => this.expanded && !this.portal),
        take(1),
      ).subscribe(() => {
        this.portal = new TemplatePortal(this.lazyContent.template, this._viewContainerRef);
      });
    }
  }


  /**
   * Send any input changes through the Subject stream
   */
  public ngOnChanges(changes: SimpleChanges): void {
    this.inputChanges.next(changes);
  }


  /**
   * Destroy the parent and finalize any subscriptions
   */
  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.inputChanges.complete();
  }

}
