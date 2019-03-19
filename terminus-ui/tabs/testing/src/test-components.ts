// tslint:disable: component-class-suffix
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  NgModule,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  TsTabBodyComponent,
  TsTabHeaderComponent,
  TsTabInkBarComponent,
  TsTabsModule,
} from '@terminus/ui/tabs';
import { Observable } from 'rxjs';




@Component({
  template: `
    <ts-tab-collection
      [(selectedIndex)]="selectedIndex"
      (animationFinished)="animationFinished()"
      (focusChange)="handleFocus($event)"
      (selectedTabChange)="handleSelection($event)"
    >
      <ts-tab>
        <ng-template tsTabLabel>Tab One</ng-template>
        Tab one content
      </ts-tab>
      <ts-tab>
        <ng-template tsTabLabel>Tab Two</ng-template>
        <span>Tab</span>
        <span>two</span>
        <span>content</span>
      </ts-tab>
      <ts-tab>
        <ng-template tsTabLabel>Tab Three</ng-template>
        Tab three content
      </ts-tab>
    </ts-tab-collection>
  `,
})
export class Basic {
  selectedIndex = 1;
  focusEvent: any;
  selectEvent: any;

  handleFocus(event: any) {
    this.focusEvent = event;
  }
  handleSelection(event: any) {
    this.selectEvent = event;
  }
  animationFinished() {}
}

 @Component({
  template: `
    <ts-tab-collection>
      <ts-tab [ariaLabel]="ariaLabel" [ariaLabelledby]="ariaLabelledby"></ts-tab>
    </ts-tab-collection>
  `,
})
export class CollectionWithAriaInputs {
  ariaLabel: string | undefined;
  ariaLabelledby: string | undefined;
}

@Component({
  template: `
    <ts-tab-collection>
      <ts-tab>
        <ng-template mat-tab-label>Tab One</ng-template>
        Tab one content
      </ts-tab>
      <ts-tab [isDisabled]="isDisabled">
        <ng-template tsTabLabel>Tab Two</ng-template>
        Tab two content
      </ts-tab>
    </ts-tab-collection>
  `,
})
export class DisabledTabs {
  isDisabled = false;
}

@Component({
  template: `
    <ts-tab-collection
      [(selectedIndex)]="selectedIndex"
      (focusChange)="handleFocus($event)"
      (selectedTabChange)="handleSelection($event)"
    >
      <ts-tab *ngFor="let tab of tabs">
        <ng-template tsTabLabel>{{ tab.label }}</ng-template>
        {{ tab.content }}
      </ts-tab>
    </ts-tab-collection>
  `,
})
export class DynamicTabs {
  tabs = [
    {label: 'Label 1', content: 'Content 1'},
    {label: 'Label 2', content: 'Content 2'},
    {label: 'Label 3', content: 'Content 3'},
  ];
  selectedIndex = 1;
  focusEvent: any;
  selectEvent: any;

  handleFocus(event: any) {
    this.focusEvent = event;
  }
  handleSelection(event: any) {
    this.selectEvent = event;
  }
}

@Component({
  template: `
    <ts-tab-collection>
      <ts-tab *ngFor="let tab of tabs | async">
        <ng-template tsTabLabel>{{ tab.label }}</ng-template>
        {{ tab.content }}
      </ts-tab>
   </ts-tab-collection>
  `,
})
export class AsyncTabs implements OnInit {
  private _tabs = [
    { label: 'one', content: 'one' },
    { label: 'two', content: 'two' },
  ];
  tabs!: Observable<any>;

  ngOnInit() {
    // Use ngOnInit because there is some issue with scheduling the async task in the constructor.
    this.tabs = new Observable((observer: any) => {
      setTimeout(() => observer.next(this._tabs));
    });
  }
}

@Component({
  template: `
    <ts-tab-collection>
      <ts-tab label="Foo">
        foo content
      </ts-tab>
      <ts-tab [label]="otherLabel">
        <span #test>
          {{ otherContent }}
        </span>
      </ts-tab>
    </ts-tab-collection>
  `,
})
export class SimpleLabels {
  otherLabel = 'Bar';
  otherContent = 'bar content';
  @ViewChild('test') testSelector: any;
}

@Component({
  template: `
    <ts-tab-collection>
      <ts-tab label="One">
        Eager
      </ts-tab>
      <ts-tab label="Two">
        <ng-template tsTabContent>
          <div class="child">Template</div>
        </ng-template>
      </ts-tab>
    </ts-tab-collection>
  `,
 })
 export class TemplateTabs {}

@Component({
  template: `
    <ts-tab-collection>
      <ts-tab label="One">
        <div style="height: 100px;">
          one content
        </div>
      </ts-tab>
      <ts-tab label="Two">
        <div style="height: 150px;">
          two content
        </div>
      </ts-tab>
    </ts-tab-collection>
  `,
 })
 export class DynamicHeight {}


interface Tab {
  label: string;
  disabled?: boolean;
}

@Component({
  template: `
  <div>
    <ts-tab-header
      [selectedIndex]="selectedIndex"
      (indexFocused)="focusedIndex = $event"
      (selectFocusedIndex)="selectedIndex = $event"
    >
      <div
        tsTabLabelWrapper
        class="label-content"
        *ngFor="let tab of tabs; let i = index"
        [isDisabled]="!!tab.disabled"
        (click)="selectedIndex = i"
      >
       {{ tab.label }}
      </div>
    </ts-tab-header>
  </div>
  `,
})
export class TabHeader {
  selectedIndex = 0;
  focusedIndex: number | undefined;
  disabledTabIndex = 1;
  tabs: Tab[] = [
    {label: 'tab one', disabled: false},
    {label: 'tab two', disabled: false},
    {label: 'tab three', disabled: false},
    {label: 'tab four', disabled: false},
  ];

  @ViewChild(TsTabHeaderComponent)
  tabHeader: TsTabHeaderComponent;

  constructor() {
    this.tabs[this.disabledTabIndex].disabled = true;
  }

  addTabsForScrolling(amount = 4) {
    for (let i = 0; i < amount; i++) {
      this.tabs.push({label: 'new'});
    }
  }
}

@Component({
  template: `
    <ng-template>Tab Body Content</ng-template>
    <ts-tab-body
      [content]="content"
      [position]="position"
      [origin]="origin"
    ></ts-tab-body>
  `,
})
export class TabBody implements AfterContentInit {
  content!: TemplatePortal;
  position: number;
  origin: number | null;

  @ViewChild(TsTabBodyComponent)
  tabBody: TsTabBodyComponent;

  @ViewChild(TemplateRef)
  template: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngAfterContentInit() {
    this.content = new TemplatePortal(this.template, this.viewContainerRef);
  }
}

@Component({
  template: `
    <ts-tab-ink-bar></ts-tab-ink-bar>
  `,
})
export class InkBar {
  @ViewChild(TsTabInkBarComponent)
  inkBar: TsTabInkBarComponent;
}




/**
 * NOTE: Currently all exported Components must belong to a module.
 * So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    TsTabsModule,
  ],
  declarations: [
    AsyncTabs,
    Basic,
    CollectionWithAriaInputs,
    DisabledTabs,
    DynamicTabs,
    SimpleLabels,
    TemplateTabs,
    DynamicHeight,
    TabHeader,
    TabBody,
    InkBar,
  ],
})
export class TsTabsTestComponentsModule {}
