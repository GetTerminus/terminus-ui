import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  configureTestBedWithoutReset,
  createFakeEvent,
  createMouseEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
} from '@terminus/ngx-tools/testing';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';

import { FormControl } from '@angular/forms';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { TsFileUploadComponent } from './file-upload.component';
import { TsFileUploadModule } from './file-upload.module';
import { TsFileImageDimensionConstraints } from './image-dimension-constraints';
import {
  TS_ACCEPTED_MIME_TYPES, TsFileAcceptedMimeTypes,
} from './mime-types';
import { TsSelectedFile } from './selected-file';


// eslint-disable-next-line max-len
const fileContentsMock = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEXXbFn0Q9OUAAAADklEQVR4AWMYRmAUjAIAAtAAAaW+yXMAAAAASUVORK5CYII=';

// IMAGE MOCK
const FILE_BLOB = new Blob(
  [fileContentsMock],
  {
    type: 'image/png',
  },
);
FILE_BLOB['lastModifiedDate'] = new Date();
FILE_BLOB['name'] = 'foo';
jest.spyOn(FILE_BLOB, 'size', 'get').mockReturnValue(3 * 1024);
const FILE_MOCK = FILE_BLOB as File;


@Component({
  template: `
    <ts-file-upload
       [hideButton]="hideButton"
       [accept]="mimeTypes"
       [formControl]="formControl"
       [maximumKilobytesPerFile]="maxKb"
       [multiple]="multiple"
       [progress]="progress"
       [seedFile]="fileToSeed"
       [dimensionConstraints]="constraints"
       [ratioConstraints]="ratioConstraints"
       [theme]="theme"
       (enter)="userDragBegin($event)"
       (exit)="userDragEnd($event)"
       (selected)="handleFile($event)"
       (selectedMultiple)="handleMultipleFiles($event)"
       (cleared)="cleared($event)"
    ></ts-file-upload>
  `,
})
class TestHostComponent {
  public mimeTypes: TsFileAcceptedMimeTypes | TsFileAcceptedMimeTypes[] | undefined = ['image/png', 'image/jpg'];
  public maxKb: number | undefined;
  public multiple = false;
  public progress: number | undefined;
  public fileToSeed: File | undefined;
  public constraints: TsFileImageDimensionConstraints | undefined;
  public ratioConstraints: Array<string> | undefined;
  public theme: TsStyleThemeTypes | undefined;
  public hideButton = false;
  public formControl = new FormControl('test');

  @ViewChild(TsFileUploadComponent)
  public component!: TsFileUploadComponent;

  public userDragBegin = jest.fn();
  public userDragEnd = jest.fn();
  public handleFile = jest.fn();
  public handleMultipleFiles = jest.fn();
  public cleared = jest.fn();
}




describe(`TsFileUploadComponent`, function() {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: TsFileUploadComponent;
  const moduleDefinition: TestModuleMetadata = {
    imports: [
      TsFileUploadModule,
    ],
    declarations: [
      TestHostComponent,
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    // Reset parent component inputs
    if (hostComponent) {
      hostComponent.mimeTypes = ['image/png', 'image/jpg'];
      hostComponent.maxKb = undefined;
      hostComponent.multiple = false;
      hostComponent.progress = undefined;
      hostComponent.fileToSeed = undefined;
      hostComponent.constraints = undefined;
      hostComponent.theme = undefined;
      hostComponent.formControl = new FormControl();
      fixture.detectChanges();
    }

    // Mock FileReader
    class DummyFileReader {
      public addEventListener = jest.fn();
      public readAsDataURL = jest.fn().mockImplementation(function(this: FileReader) {
        this.onload({} as Event);
      });
      // eslint-disable-next-line max-len
      public result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEXXbFn0Q9OUAAAADklEQVR4AWMYRmAUjAIAAtAAAaW+yXMAAAAASUVORK5CYII=';
    }
    // Not sure why any is needed
    (window as any).FileReader = jest.fn(() => new DummyFileReader);


    class DummyImage {
      public _onload = () => {};
      public set onload(fn) {
        this._onload = fn;
      }
      public get onload() {
        return this._onload;
      }
      public set src(source) {
        this.onload();
      }
      public get naturalWidth() {
        return 100;
      }
      public get naturalHeight() {
        return 100;
      }
    }
    (window as any).Image = jest.fn(() => new DummyImage());

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.component;
  });


  describe(`accept`, () => {

    test(`should reset to defaults if nothing is passed in`, () => {
      hostComponent.mimeTypes = 'text/csv';
      fixture.detectChanges();
      expect(component.acceptedTypes).toEqual(['text/csv']);

      hostComponent.mimeTypes = undefined;
      fixture.detectChanges();

      expect(component.acceptedTypes).toEqual(TS_ACCEPTED_MIME_TYPES);
    });

  });


  describe(`seedFile`, () => {

    test(`should seed the file and trigger all process'`, () => {
      hostComponent.fileToSeed = FILE_MOCK;
      fixture.detectChanges();

      expect(hostComponent.handleFile.mock.calls.length).toEqual(1);
      const tsFile = component.file;
      if (tsFile) {
        expect(hostComponent.formControl.value).toEqual(tsFile.file);
      }
      expect(component.seedFile).toEqual(FILE_MOCK);
    });

  });


  describe(`buttonMessage`, () => {

    test(`should set the correct drop vs select message pluralized if neeeded`, () => {
      const el = component['elementRef'].nativeElement;
      hostComponent.multiple = true;
      dispatchMouseEvent(el, 'dragover');
      fixture.detectChanges();

      // Drag in progress - plural
      const message1 = fixture.debugElement.query(By.css('.c-file-upload__prompt')).nativeElement.textContent.trim();
      expect(message1).toEqual('Drop Files');

      // No drag - plural
      dispatchMouseEvent(el, 'dragleave');
      fixture.detectChanges();
      const message2 = fixture.debugElement.query(By.css('.c-file-upload__prompt')).nativeElement.textContent.trim();
      expect(message2).toEqual('Select Files');

      // No drag - singular
      hostComponent.multiple = false;
      fixture.detectChanges();
      const message3 = fixture.debugElement.query(By.css('.c-file-upload__prompt')).nativeElement.textContent.trim();
      expect(message3).toEqual('Select File');

      // Drag - singular
      dispatchMouseEvent(el, 'dragover');
      fixture.detectChanges();
      const message4 = fixture.debugElement.query(By.css('.c-file-upload__prompt')).nativeElement.textContent.trim();
      expect(message4).toEqual('Drop File');
    });

  });


  describe(`hideButton`, () => {

    test(`should hide the button from view`, () => {
      fixture.detectChanges();
      const button1 = fixture.debugElement.query(By.css('.c-file-upload__prompt--hidden'));
      expect(button1).toBeFalsy();

      hostComponent.hideButton = true;
      fixture.detectChanges();
      const button2 = fixture.debugElement.query(By.css('.c-file-upload__prompt--hidden'));
      expect(button2).toBeTruthy();
    });

  });


  describe(`validation messages`, () => {

    test(`should show size validation message`, () => {
      hostComponent.maxKb = 2;
      fixture.detectChanges();
      component.seedFile = FILE_MOCK;
      fixture.detectChanges();
      const messages = fixture.debugElement.query(By.css('.c-validation-message'));
      const uploadDiv = fixture.debugElement.query(By.css('.c-file-upload'));

      expect(messages.nativeElement.textContent).toContain('Must be smaller than');
      expect(uploadDiv.classes['c-file-upload--error']).toBeTruthy();
    });


    test(`should show MIME type validation message`, () => {
      hostComponent.mimeTypes = 'text/csv';
      fixture.detectChanges();
      component.seedFile = FILE_MOCK;
      fixture.detectChanges();
      const messages = fixture.debugElement.query(By.css('.c-validation-message'));
      const uploadDiv = fixture.debugElement.query(By.css('.c-file-upload'));

      expect(messages.nativeElement.textContent).toContain('is not an accepted MIME type');
      expect(uploadDiv.classes['c-file-upload--error']).toBeTruthy();
    });


    test(`should show image dimension validation message`, () => {
      hostComponent.constraints = [{
        height: {
          min: 50,
          max: 50,
        },
        width: {
          min: 50,
          max: 50,
        },
      }];
      fixture.detectChanges();
      component.seedFile = FILE_MOCK;
      fixture.detectChanges();
      const messages = fixture.debugElement.query(By.css('.c-validation-message'));
      const uploadDiv = fixture.debugElement.query(By.css('.c-file-upload'));

      expect(messages.nativeElement.textContent).toContain('is not an allowed image dimension');
      expect(uploadDiv.classes['c-file-upload--error']).toBeTruthy();
    });


    test(`should show image ratio validation message`, () => {
      hostComponent.ratioConstraints = ['2:1'];
      fixture.detectChanges();
      component.seedFile = FILE_MOCK;
      fixture.detectChanges();
      const messages = fixture.debugElement.query(By.css('.c-validation-message'));
      const uploadDiv = fixture.debugElement.query(By.css('.c-file-upload'));

      expect(messages.nativeElement.textContent).toContain('is not an allowed image ratio');
      expect(uploadDiv.classes['c-file-upload--error']).toBeTruthy();
    });

  });


  describe(`hints`, () => {

    test(`should set image hints`, () => {
      hostComponent.mimeTypes = ['image/jpg', 'image/png'];
      hostComponent.maxKb = 100;
      hostComponent.constraints = [
        {
          height: {
            min: 50,
            max: 50,
          },
          width: {
            min: 50,
            max: 50,
          },
        },
        {
          height: {
            min: 100,
            max: 150,
          },
          width: {
            min: 100,
            max: 100,
          },
        },
        {
          height: {
            min: 200,
            max: 200,
          },
          width: {
            min: 200,
            max: 250,
          },
        },
      ];
      fixture.detectChanges();
      const hints = fixture.debugElement.queryAll(By.css('.c-file-upload__hint'));

      expect(hints[0].nativeElement.textContent).toContain('Must be a valid dimension: 50x50, 100x100-150, 200-250x200');
      expect(hints[1].nativeElement.textContent).toContain('Must be jpg, png');
      expect(hints[2].nativeElement.textContent).toContain('Must be under 100kb');
    });


    test(`should not set dimensions hint if constraints were not passed in`, () => {
      hostComponent.mimeTypes = ['image/jpg', 'image/png'];
      hostComponent.maxKb = 100;
      fixture.detectChanges();
      const hints = fixture.debugElement.queryAll(By.css('.c-file-upload__hint'));

      expect(hints.length).toEqual(2);
      expect(hints[0].nativeElement.textContent).toContain('Must be jpg, png');
      expect(hints[1].nativeElement.textContent).toContain('Must be under 100kb');
    });


    test(`should set csv hints`, () => {
      hostComponent.mimeTypes = 'text/csv';
      hostComponent.maxKb = 100;
      fixture.detectChanges();
      const hints = fixture.debugElement.queryAll(By.css('.c-file-upload__hint'));

      expect(hints[0].nativeElement.textContent).toContain('Must be csv');
      expect(hints[1].nativeElement.textContent).toContain('Must be under 100kb');
    });

    test(`should set ratio constraint hints`, () => {
      hostComponent.ratioConstraints = ['1:2'];
      fixture.detectChanges();
      const hints = fixture.debugElement.queryAll(By.css('.c-file-upload__hint'));

      expect(hints[2].nativeElement.textContent).toContain('Must have valid image ratio of 1:2');
    });
  });


  describe(`removeFile`, () => {

    test(`should clear the file, clear validations and emit an event`, () => {
      hostComponent.mimeTypes = 'text/csv';
      fixture.detectChanges();
      component.seedFile = FILE_MOCK;
      fixture.detectChanges();

      // Verify a message exists
      expect(fixture.debugElement.query(By.css('.c-validation-message'))).toBeTruthy();

      component.removeFile();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.c-validation-message'))).toBeFalsy();
      expect(hostComponent.cleared).toHaveBeenCalled();
      expect(component.file).toBeFalsy();
    });


    test(`should stop event propogation`, () => {
      component.seedFile = FILE_MOCK;
      fixture.detectChanges();
      component['preventAndStopEventPropagation'] = jest.fn();
      const mouseEvent = createMouseEvent('click');
      component.removeFile(mouseEvent);

      expect(component['preventAndStopEventPropagation']).toHaveBeenCalledWith(mouseEvent);
    });

  });


  describe(`setUpNewFile`, () => {

    test(`should not continue if no file is passed in`, () => {
      component['setValidationMessages'] = jest.fn();
      component['setUpNewFile'](undefined as any);

      expect(component['setValidationMessages']).not.toHaveBeenCalled();
    });

  });


  describe(`setValidationMessages`, () => {

    test(`should do nothing if no file was passed in`, () => {
      component.formControl.setErrors = jest.fn();
      component['setValidationMessages'](undefined);
      expect(component.formControl.setErrors).not.toHaveBeenCalled();
    });

  });


  describe(`updateVirtualFileInputAttrs`, () => {

    test(`should add and remove the multiple attr`, () => {
      expect(component['virtualFileInput'].getAttribute('multiple')).toBeFalsy();

      hostComponent.multiple = true;
      fixture.detectChanges();

      expect(component['virtualFileInput'].getAttribute('multiple')).toBeTruthy();

      hostComponent.multiple = false;
      fixture.detectChanges();

      expect(component['virtualFileInput'].getAttribute('multiple')).toBeFalsy();
    });


    test(`should add and remove the accept attr`, () => {
      expect(component['virtualFileInput'].getAttribute('accept')).toBeFalsy();

      hostComponent.mimeTypes = 'text/csv';
      fixture.detectChanges();

      expect(component['virtualFileInput'].getAttribute('accept')).toEqual('text/csv');

      hostComponent.mimeTypes = undefined;
      fixture.detectChanges();

      expect(component['virtualFileInput'].getAttribute('accept')).toEqual('text/csv,image/jpeg,image/jpg,image/png,image/gif,video/mp4');
    });

  });


  describe(`HostListeners`, () => {

    test(`should handle dragover`, () => {
      component['preventAndStopEventPropagation'] = jest.fn();
      dispatchMouseEvent(component['elementRef'].nativeElement, 'dragover');
      fixture.detectChanges();
      const foundClass = fixture.debugElement.query(By.css('.c-file-upload--drag'));

      expect(foundClass).toBeTruthy();
      expect(component['preventAndStopEventPropagation']).toHaveBeenCalledWith(expect.any(Event));
      expect(hostComponent.userDragBegin).toHaveBeenCalled();
    });


    test(`should handle dragleave`, () => {
      component['preventAndStopEventPropagation'] = jest.fn();
      dispatchMouseEvent(component['elementRef'].nativeElement, 'dragleave');
      fixture.detectChanges();
      const foundClass = fixture.debugElement.query(By.css('.c-file-upload--drag'));

      expect(foundClass).toBeFalsy();
      expect(component['preventAndStopEventPropagation']).toHaveBeenCalledWith(expect.any(Event));
      expect(hostComponent.userDragEnd).toHaveBeenCalled();
    });


    test(`should handle drop`, () => {
      component.dragInProgress = true;
      component['preventAndStopEventPropagation'] = jest.fn();
      component['collectFilesFromEvent'] = jest.fn();
      const event = createFakeEvent('drop');
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.c-file-upload--drag'))).toBeTruthy();

      component['elementRef'].nativeElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.c-file-upload--drag'))).toBeFalsy();
      expect(component['preventAndStopEventPropagation']).toHaveBeenCalled();
      expect(component['collectFilesFromEvent']).toHaveBeenCalled();
    });


    test(`should handle click`, () => {
      component['virtualFileInput'].click = jest.fn();
      dispatchMouseEvent(component['elementRef'].nativeElement, 'click');

      expect(component['virtualFileInput'].click).toHaveBeenCalled();
    });


    describe(`keypress`, () => {
      let el: HTMLElement;

      beforeEach(() => {
        el = component['elementRef'].nativeElement;
        component.promptForFiles = jest.fn();
        el.blur = jest.fn();
      });

      test(`should trigger file selection if Enter was pressed`, () => {
        dispatchKeyboardEvent(el, 'keydown', KEYS.ENTER);

        expect(component.promptForFiles).toHaveBeenCalled();
        expect(el.blur).toHaveBeenCalled();
      });


      test(`should do nothing if the key pressed was not Enter`, () => {
        dispatchKeyboardEvent(el, 'keydown', KEYS.A);

        expect(component.promptForFiles).not.toHaveBeenCalled();
        expect(el.blur).not.toHaveBeenCalled();
      });
    });

  });


  describe(`collectFilesFromEvent`, () => {

    test(`should throw an error if no files exist in the dataTransfer object`, () => {
      const event = createFakeEvent('DragEvent') as DragEvent;
      const dataTransfer = {
        files: [],
      };
      Object.defineProperty(event, 'dataTransfer', {
        value: dataTransfer,
      });
      component['setUpNewFile'] = jest.fn();
      expect(() => {
        component['collectFilesFromEvent'](event);
      }).toThrowError();
      fixture.detectChanges();

      expect(component['setUpNewFile']).not.toHaveBeenCalled();
      expect(hostComponent.handleFile).not.toHaveBeenCalled();
    });


    test(`should throw an error if no files exist on the event target`, () => {
      const event = createFakeEvent('Event');
      const input = document.createElement('input');
      Object.defineProperty(event, 'target', {
        value: input,
      });
      component['setUpNewFile'] = jest.fn();
      expect(() => {
        component['collectFilesFromEvent'](event);
      }).toThrowError();
      fixture.detectChanges();

      expect(component['setUpNewFile']).not.toHaveBeenCalled();
      expect(hostComponent.handleFile).not.toHaveBeenCalled();
    });


    test(`should collect a file from a drag/drop event`, () => {
      const event = createFakeEvent('DragEvent') as DragEvent;
      const dataTransfer = {
        files: [FILE_MOCK],
      };
      Object.defineProperty(event, 'dataTransfer', {
        value: dataTransfer,
      });
      component['setUpNewFile'] = jest.fn();
      fixture.detectChanges();
      component['collectFilesFromEvent'](event);
      fixture.detectChanges();

      expect(component['setUpNewFile']).toHaveBeenCalledWith(expect.any(TsSelectedFile));
      expect(hostComponent.handleFile).toHaveBeenCalledWith(expect.any(TsSelectedFile));
      expect(hostComponent.formControl.value).toEqual(FILE_MOCK);
    });


    test(`should collect a file from an input change (manual selection)`, () => {
      const event = createFakeEvent('Event');
      const input = document.createElement('input');
      Object.defineProperty(input, 'files', {
        value: [FILE_MOCK],
      });
      Object.defineProperty(event, 'target', {
        value: input,
      });
      component['setUpNewFile'] = jest.fn();
      component['collectFilesFromEvent'](event);
      fixture.detectChanges();

      expect(component['setUpNewFile']).toHaveBeenCalledWith(expect.any(TsSelectedFile));
      expect(hostComponent.handleFile).toHaveBeenCalledWith(expect.any(TsSelectedFile));
    });


    test(`should collect emit when multiple files are selected`, () => {
      const event = createFakeEvent('DragEvent') as DragEvent;
      const dataTransfer = {
        files: [FILE_MOCK, FILE_MOCK],
      };
      Object.defineProperty(event, 'dataTransfer', {
        value: dataTransfer,
      });
      component['setUpNewFile'] = jest.fn();
      component['collectFilesFromEvent'](event);
      fixture.detectChanges();

      expect(hostComponent.handleMultipleFiles).toHaveBeenCalled();
      expect(hostComponent.handleFile).not.toHaveBeenCalled();
      expect(component['setUpNewFile']).not.toHaveBeenCalled();
    });

  });


  describe(`ngOnDestroy`, () => {

    test(`should remove the event listener`, () => {
      component['onVirtualInputElementChange'] = jest.fn();
      component['dropProtectionService'].remove = jest.fn();
      component.ngOnDestroy();
      const event = createFakeEvent('change');
      component['virtualFileInput'].dispatchEvent(event);

      expect(component['onVirtualInputElementChange']).not.toHaveBeenCalled();
      expect(component['dropProtectionService'].remove).toHaveBeenCalled();
    });

  });


  describe(`virtualFileInput.change`, () => {

    test(`should trigger the file handler`, () => {
      component['collectFilesFromEvent'] = jest.fn();
      // Wire up bindings
      component.ngAfterContentInit();
      const event = createFakeEvent('change');
      component['virtualFileInput'].dispatchEvent(event);

      expect(component['collectFilesFromEvent']).toHaveBeenCalled();
      expect(component['virtualFileInput'].value).toEqual('');
    });

  });


  describe(`preventAndStopEventPropagation`, () => {

    test(`should both prevent and stop event propogation`, () => {
      const event = createFakeEvent('fake');
      Object.defineProperties(event, {
        preventDefault: {
          value: jest.fn(),
        },
        stopPropagation: {
          value: jest.fn(),
        },
      });
      component['preventAndStopEventPropagation'](event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

  });


  describe(`ngOnInit`, () => {

    test(`should enable dropProtectionService`, () => {
      component['dropProtectionService'].add = jest.fn();
      component.ngOnInit();

      expect(component['dropProtectionService'].add).toHaveBeenCalled();
    });

  });


  describe(`theme`, () => {

    test(`should set the theme`, () => {
      hostComponent.theme = 'warn';
      fixture.detectChanges();

      expect(component.theme).toEqual('warn');
    });

  });

  describe(`ratioConstraint format`, () => {
    test(`should throw error if ratioContraint is not in right format`, () => {
      expect(() => {
        try {
          hostComponent.ratioConstraints = '5' as any;
          fixture.detectChanges();
        } catch (e) {
          throw new Error(e);
        }
      }).toThrowError();
    });
  });

});
