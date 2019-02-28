// tslint:disable: component-class-suffix
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsExpansionPanelModule, TS_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@terminus/ui/expansion-panel';
import { noop } from '@terminus/ngx-tools';


@Component({
  template: `
    <ts-accordion>
      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 1
        </ts-expansion-panel-trigger>

        Content 1
      </ts-expansion-panel>

      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 2
        </ts-expansion-panel-trigger>

        Content 2
      </ts-expansion-panel>
    </ts-accordion>
  `,
})
export class Accordion {}

@Component({
  template: `
    <ts-accordion (destroyed)="destroyed()">
      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 1
        </ts-expansion-panel-trigger>

        Content 1
      </ts-expansion-panel>

      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 2
        </ts-expansion-panel-trigger>

        Content 2
      </ts-expansion-panel>
    </ts-accordion>
  `,
})
export class AccordionDestroyed {
  destroyed = noop;
}

@Component({
  template: `
    <ts-accordion [multi]="true">
      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 1
        </ts-expansion-panel-trigger>

        Content 1
      </ts-expansion-panel>

      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 2
        </ts-expansion-panel-trigger>

        Content 2
      </ts-expansion-panel>
    </ts-accordion>
  `,
})
export class AccordionMulti {}

@Component({
  template: `
    <ts-expansion-panel>
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content

      <ts-expansion-panel-action-row>
        <button>Foo</button>
      </ts-expansion-panel-action-row>
    </ts-expansion-panel>
  `,
})
export class ActionRow {}

@Component({
  template: `
    <ts-expansion-panel>
      <ts-expansion-panel-trigger
        [collapsedHeight]="collapsed"
        [expandedHeight]="expanded"
      >
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class CustomHeights {
  collapsed = '33px';
  expanded = '66px';
}

@Component({
  template: `
    <ts-expansion-panel>
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
  providers: [
    {
      provide: TS_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {
        expandedHeight: '88px',
        collapsedHeight: '55px',
        hideToggle: true,
      },
    },
  ],
})
export class CustomDefaults {}

@Component({
  template: `
    <ts-expansion-panel [isExpanded]="true">
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class DefaultOpen {}

@Component({
  template: `
    <ts-expansion-panel>
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      <ng-template tsExpansionPanelContent>
        My content
      </ng-template>
    </ts-expansion-panel>
  `,
})
export class DeferredContent {}

@Component({
  template: `
    <ts-expansion-panel [isDisabled]="true">
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class DisabledPanel {}

@Component({
  template: `
    <ts-expansion-panel
      (opened)="opened()"
      (closed)="closed()"
      (expandedChange)="expandedChange($event)"
      (afterExpand)="afterExpand()"
      (afterCollapse)="afterCollapse()"
      (destroyed)="destroyed()"
    >
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class Events {
  opened = noop;
  closed = noop;
  afterExpand = noop;
  afterCollapse = noop;
  destroyed = noop;
  expandedChange = (v) => {};
}

@Component({
  template: `
    <ts-expansion-panel [hideToggle]="true">
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class HideToggle {}

@Component({
  template: `
    <ts-accordion [hideToggle]="true">
      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 1
        </ts-expansion-panel-trigger>

        Content 1
      </ts-expansion-panel>

      <ts-expansion-panel>
        <ts-expansion-panel-trigger>
          Trigger 2
        </ts-expansion-panel-trigger>

        Content 2
      </ts-expansion-panel>
    </ts-accordion>
  `,
})
export class HideToggleAccordion {}

@Component({
  template: `
    <ts-expansion-panel>
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class ProgrammaticControl {}

@Component({
  template: `
    <ts-expansion-panel>
      <ts-expansion-panel-trigger>
        My trigger
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class SinglePanel {}

@Component({
  template: `
    <ts-expansion-panel>
      <ts-expansion-panel-trigger>
       <ts-expansion-panel-trigger-title>
         My title
       </ts-expansion-panel-trigger-title>
       <ts-expansion-panel-trigger-description>
         My description
       </ts-expansion-panel-trigger-description>
      </ts-expansion-panel-trigger>

      My content
    </ts-expansion-panel>
  `,
})
export class TriggerTitleDescription {}




/**
 * NOTE: Currently all exported Components must belong to a module.
 * So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    TsExpansionPanelModule,
  ],
  declarations: [
    Accordion,
    AccordionDestroyed,
    AccordionMulti,
    ActionRow,
    CustomHeights,
    CustomDefaults,
    DefaultOpen,
    DeferredContent,
    DisabledPanel,
    Events,
    HideToggle,
    HideToggleAccordion,
    ProgrammaticControl,
    SinglePanel,
    TriggerTitleDescription,
  ],
})
export class TsExpansionPanelTestComponentsModule {}
