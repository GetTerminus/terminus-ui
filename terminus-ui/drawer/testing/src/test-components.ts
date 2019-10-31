import {
  Component,
  ElementRef,
  NgModule,
  ViewChild,
} from '@angular/core';
import { TsButtonModule } from '@terminus/ui/button';
import {
  TsDrawerComponent,
  TsDrawerContentComponent,
  TsDrawerModes,
  TsDrawerModule,
  TsDrawerPosition,
} from '@terminus/ui/drawer';

@Component({
  template: `
    <ts-drawer-container>
      <ts-drawer
        [mode]="mode"
        [position]="position"
        #drawer
      >
      <div>
        Drawer's content
      </div>
      </ts-drawer>
      <ts-drawer-content>
        Main content
      </ts-drawer-content>
    </ts-drawer-container>
  `,
})
export class RegularDrawer {
  public mode: TsDrawerModes = 'push';
  public position: TsDrawerPosition = 'start';
}

@Component({
  template: `
    <ts-drawer-container>
      <ts-drawer
        [mode]="mode"
        [position]="position"
        [collapsedSize]="collapsedSize"
        [expandedSize]="expandedSize"
        #drawer
        style="width:100px"
      >
      <div>
        Drawer's content
      </div>
      </ts-drawer>
      <ts-drawer-content>
        Main content
      </ts-drawer-content>
    </ts-drawer-container>
  `,
})
export class SetSizeDrawer {
  @ViewChild(TsDrawerComponent, { static: false }) public drawer!: TsDrawerComponent;
  public mode: TsDrawerModes = 'overlay';
  public position: TsDrawerPosition = 'start';
  public collapsedSize = '3rem';
  public expandedSize = '12rem';
}

@Component({
  template: `
    <ts-drawer-container
      (backdropClick)="backdropClicked()"
      [hasBackdrop]="hasBackdrop">
      <ts-drawer
         #drawer="tsDrawer"
         position="start"
         [collapsedSize]="collapsedSize"
         (isExpanded)="expand()"
         (expandedStart)="expandStart()"
         (closed)="collapse()"
         (collapsedStart)="collapseStart()">
        <button #drawerButton>Content</button>
      </ts-drawer>
      <button (click)="drawer.expand()" class="open" #openButton></button>
      <button (click)="drawer.collapse()" class="close" #closeButton></button>
    </ts-drawer-container>`,
})
export class BasicDrawer {
  public collapsedSize = '2rem';
  public openCount = 0;
  public openStartCount = 0;
  public closeCount = 0;
  public closeStartCount = 0;
  public backdropClickedCount = 0;
  public hasBackdrop = true;

  @ViewChild('drawer', { static: false })
  public drawer!: TsDrawerComponent;
  @ViewChild('drawerButton', { static: false })
  public drawerButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('openButton', { static: false })
  public openButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeButton', { static: false })
  public closeButton!: ElementRef<HTMLButtonElement>;

  public expand() {
    this.openCount++;
  }
  public expandStart() {
    this.openStartCount++;
  }
  public collapse() {
    this.closeCount++;
  }
  public collapseStart() {
    this.closeStartCount++;
  }
  public backdropClicked() {
    this.backdropClickedCount++;
  }
}

@Component({
  template: `
    <ts-drawer-container>
      <ts-drawer
        [mode]="mode"
        [position]="position"
        [isExpanded]="isExpanded"
        #drawer
      >
      <div>
        Drawer's content
      </div>
      </ts-drawer>
      <ts-drawer-content>
        Main content
      </ts-drawer-content>
    </ts-drawer-container>
  `,
})
export class OpenOnLoadDrawer {
  public mode: TsDrawerModes = 'push';
  public position: TsDrawerPosition = 'start';
  public isExpanded = true;
}

@Component({
  template: `
    <ts-drawer-container>
      <ts-drawer
        #drawer1
        [position]="drawer1Position"
        [mode]="mode"
      ></ts-drawer>
      <ts-drawer
        #drawer2
        [position]="drawer2Position"
        [mode]="mode2"
      ></ts-drawer>
      <ts-drawer-content>Content</ts-drawer-content>
    </ts-drawer-container>`,
})
export class MultipleDrawer {
  public drawer1Position: TsDrawerPosition = 'end';
  public drawer2Position: TsDrawerPosition = 'end';
  public mode: TsDrawerModes = 'push';
  public mode2: TsDrawerModes = 'overlay';
  @ViewChild(TsDrawerContentComponent, { static: false })
  public drawerContent!: TsDrawerContentComponent;
}

@Component({
  template: `
    <ts-drawer-container>
      <ts-drawer
        position="start"
        mode="push"
      ></ts-drawer>
      <ts-drawer
        position="start"
        mode="push"
      ></ts-drawer>
      <ts-drawer-content>Content</ts-drawer-content>
    </ts-drawer-container>`,
})
export class MultiDrawerSameSidePush {

}

@Component({
  template: `
    <ts-drawer-container >
      <ts-drawer
        [mode]="mode"
        [position]="position"
        style="width:100px"
      ></ts-drawer>
      <ts-drawer-content>Content</ts-drawer-content>
    </ts-drawer-container>`,
})
export class SetMargins {
  @ViewChild(TsDrawerComponent, { static: false })
  public drawer!: TsDrawerComponent;
  @ViewChild(TsDrawerContentComponent, { static: false })
  public drawerContent!: TsDrawerContentComponent;

  public mode = 'push';
  public position = 'start';
}

@Component({
  template: `
    <ts-drawer-container>
    <ts-drawer
    [mode]="mode"
    [position]="position"
    [collapsedSize]="collapsedSize"
    [expandedSize]="expandedSize"
    >Drawer</ts-drawer>
    </ts-drawer-container>
  `,
})
export class SimpleDrawer {
  public mode = 'push';
  public position = 'start';
  public collapsedSize = null;
  public expandedSize = null;
}


/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    TsDrawerModule,
    TsButtonModule,
  ],
  declarations: [
    RegularDrawer,
    SetSizeDrawer,
    BasicDrawer,
    OpenOnLoadDrawer,
    MultipleDrawer,
    MultiDrawerSameSidePush,
    SetMargins,
    SimpleDrawer,
  ],
})
export class TsDrawerContainerTestComponentsModule { }

