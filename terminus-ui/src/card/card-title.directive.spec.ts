import {
  Component,
  Input,
  TemplateRef,
  ElementRef,
} from '@angular/core';
import {
  TestBed,
  TestModuleMetadata,
  ComponentFixture,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureTestBedWithoutReset } from '@terminus/ngx-tools/testing';

import { TsCardTitleDirective } from './card-title.directive';

@Component({
  selector: 'ts-card',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
})
class TsCardComponent {
  public aspectRatioPadding!: string;
  public supportsInteraction: boolean = false;
  public centeredContent: boolean = false;
  public utilityMenuTemplate: TemplateRef<ElementRef> | undefined;
  public disabled: boolean = false;
  @Input()
  public set aspectRatio(value: any) {
    this.aspectRatioPadding = '50%';
  }
}

@Component({
  template: `
    <ts-card>
      <h3 tsCardTitle>Hi</h3>
    </ts-card>
  `,
})
class TestHostComponent {}

@Component({
  template: `
    <ts-card>
      <h3 tsCardTitle tsTitleAccentBorder>Hi</h3>
    </ts-card>
  `,
})
class TestHostAccentBorderComponent {}

@Component({
  template: `
    <h3 tsCardTitle class="fooooo">Hi</h3>
  `,
})
class TestHostErrorComponent {}


describe(`TsCardTitleDirective`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TsCardComponent;
  let directive: TsCardTitleDirective;

  const moduleDefinition: TestModuleMetadata = {
    declarations: [
      TsCardTitleDirective,
      TsCardComponent,
      TestHostComponent,
      TestHostAccentBorderComponent,
      TestHostErrorComponent,
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);


  test.only(`should add the title class`, () => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const classElement = fixture.debugElement.query(By.directive(TsCardTitleDirective));

    expect(classElement.properties.className).toEqual('c-card__title');
  });


  test(`should add the accent border class`, () => {
/*     fixture = TestBed.overrideTemplate(fixture, `
    <ts-card>
      <h3 tsCardTitle tsTitleAccentBorder>Hi</h3>
    </ts-card>
  `); */
    fixture = TestBed.createComponent(TestHostAccentBorderComponent);
    fixture.detectChanges();
    const classElement = fixture.debugElement.query(By.directive(TsCardTitleDirective));

    expect(classElement.properties.className).toEqual('c-card__title c-card__title-accent-border');
  });


  test(`should throw an error if not nested within a TsCardComponent`, () => {
    component = new TsCardComponent();
    directive = new TsCardTitleDirective(component);
    const errorMessage = `The 'tsCardTitle' directive must be inside a <ts-card> component.`;

    expect(() => directive.ngOnChanges()).toThrowError(errorMessage);
  });

});

