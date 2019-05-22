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
  public selectedIndex = 1;
  public focusEvent: any;
  public selectEvent: any;

  public handleFocus(event: any) {
    this.focusEvent = event;
  }
  public handleSelection(event: any) {
    this.selectEvent = event;
  }
  public animationFinished() {}
}

 @Component({
   template: `
    <ts-tab-collection>
      <ts-tab [ariaLabel]="ariaLabel" [ariaLabelledby]="ariaLabelledby"></ts-tab>
    </ts-tab-collection>
  `,
 })
export class CollectionWithAriaInputs {
  public ariaLabel: string | undefined;
  public ariaLabelledby: string | undefined;
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
  public isDisabled = false;
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
  public tabs = [
    {
      label: 'Label 1',
      content: 'Content 1',
    },
    {
      label: 'Label 2',
      content: 'Content 2',
    },
    {
      label: 'Label 3',
      content: 'Content 3',
    },
  ];
  public selectedIndex = 1;
  public focusEvent: any;
  public selectEvent: any;

  public handleFocus(event: any) {
    this.focusEvent = event;
  }
  public handleSelection(event: any) {
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
    {
      label: 'one',
      content: 'one',
    },
    {
      label: 'two',
      content: 'two',
    },
  ];
  public tabs!: Observable<any>;

  public ngOnInit() {
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
  public otherLabel = 'Bar';
  public otherContent = 'bar content';
  @ViewChild('test') public testSelector: any;
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
  public selectedIndex = 0;
  public focusedIndex: number | undefined;
  public disabledTabIndex = 1;
  public tabs: Tab[] = [
    {
      label: 'tab one',
      disabled: false,
    },
    {
      label: 'tab two',
      disabled: false,
    },
    {
      label: 'tab three',
      disabled: false,
    },
    {
      label: 'tab four',
      disabled: false,
    },
  ];

  @ViewChild(TsTabHeaderComponent)
  public tabHeader: TsTabHeaderComponent;

  public constructor() {
    this.tabs[this.disabledTabIndex].disabled = true;
  }

  public addTabsForScrolling(amount = 4) {
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
  public content!: TemplatePortal;
  public position: number;
  public origin: number | null;

  @ViewChild(TsTabBodyComponent)
  public tabBody: TsTabBodyComponent;

  @ViewChild(TemplateRef)
  public template: TemplateRef<any>;

  public constructor(private viewContainerRef: ViewContainerRef) { }

  public ngAfterContentInit() {
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
  public inkBar: TsTabInkBarComponent;
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
