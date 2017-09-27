import { Component, ViewChild } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdIconModule, MdRippleModule } from '@angular/material';

import { TsCopyComponent } from './copy.component';
import { TsWindowService } from '../services/window/window.service';
import { TsDocumentService } from '../services/document/document.service';


@Component({
  template: `
    <div>
      <ts-copy
        [enableQuickCopy]="canCopy"
      >{{ fakeContent }}</ts-copy>
    </div>
  `,
})
class TestHostComponent {
  fakeContent = 'foobar';
  canCopy = true;

  @ViewChild(TsCopyComponent)
  public copyComponent: TsCopyComponent;
}

describe(`TsCopyComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdIconModule,
        MdRippleModule,
        FlexLayoutModule,
      ],
      providers: [
        // NOTE: We are not using mock services here since this component needs to test actual
        // interaction with the window and document objects
        TsWindowService,
        TsDocumentService,
      ],
      declarations: [
        TsCopyComponent,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.copyComponent;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });


  it(`should expose passed in text`, () => {
    this.fixture.detectChanges();
    const element = this.fixture.nativeElement;
    const actual = element.querySelector('.c-copy__content').innerText;
    const expected = this.hostComponent.fakeContent;

    expect(actual).toBe(expected);
  });


  describe(`textContent()`, () => {

    it(`should return the content if accessible`, () => {
      this.fixture.detectChanges();
      const actual = this.component.textContent;
      const expected = this.hostComponent.fakeContent;
      expect(actual).toEqual(expected);
    });


    it(`should return an empty string if the content is not accessible`, () => {
      this.fixture.detectChanges();
      this.component.content.nativeElement.innerText = null;
      const actual = this.component.textContent;
      const expected = '';
      expect(actual).toEqual(expected);
    });

  });


  describe(`selectText()`, () => {

    it(`should return false if disabled`, () => {
      this.fixture.detectChanges();
      const actual = this.component.selectText(this.component.content, false, true);
      const expected = false;
      expect(actual).toEqual(expected);
    });


    it(`should return if already selected`, () => {
      this.fixture.detectChanges();
      const actual = this.component.selectText(this.component.content, true, false);
      const expected = false;
      expect(actual).toEqual(expected);
    });


    it(`should select the text within the passed in element`, () => {
      this.fixture.detectChanges();
      this.component.selectText(this.component.content.nativeElement, false, false)
      const actual = this.component.window.getSelection().toString();
      const expected = this.hostComponent.fakeContent;

      expect(actual).toEqual(expected);
    });

  });


  describe(`resetSelection()`, () => {

    it(`should set the flag to false`, () => {
      this.component.hasSelected = true;
      this.fixture.detectChanges();

      expect(this.component.hasSelected).toEqual(true);

      this.component.resetSelection();
      expect(this.component.hasSelected).toEqual(false);
    });

  });


  describe(`copyToClipboard()`, () => {

    it(`should set the text to the clipboard`, () => {
      this.component.documentService.document.execCommand = jasmine.createSpy('execCommand');
      this.fixture.detectChanges();
      this.component.copyToClipboard('foo')

      expect(this.component.documentService.document.execCommand).toHaveBeenCalledWith('copy');
    });


    it(`should fall back to a prompt if execCommand fails`, () => {
      this.component.window.prompt = jasmine.createSpy('prompt');
      this.component.documentService.document.execCommand = () => {
        throw new Error('fake error');
      }

      this.fixture.detectChanges();
      this.component.copyToClipboard('foo');

      expect(this.component.window.prompt).toHaveBeenCalled();
    });

  });

});
