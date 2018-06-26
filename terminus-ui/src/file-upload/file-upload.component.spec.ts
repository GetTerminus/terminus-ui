import { ViewChild, Component } from '@angular/core';
import { ComponentFixture, TestModuleMetadata, TestBed } from '@angular/core/testing';
import { configureTestBedWithoutReset } from '@terminus/ngx-tools/testing';

import { TsFileImageDimensionConstraints } from './image-dimension-constraints';
import { TsFileUploadComponent } from './file-upload.component';
import { TsStyleThemeTypes } from './../utilities/types/style-theme.types';
import { TsFileAcceptedMimeTypes } from './mime-types';
import { TsFileUploadModule } from './file-upload.module';
import { TsSelectedFile } from './selected-file';


const CONSTRAINTS_MOCK: TsFileImageDimensionConstraints = [
  {
    height: {
      min: 50,
      max: 100,
    },
    width: {
      min: 50,
      max: 100,
    },
  },
  {
    height: {
      min: 72,
      max: 72,
    },
    width: {
      min: 72,
      max: 72,
    },
  },
];

// IMAGE MOCK
const FILE_BLOB = new Blob(
  // tslint:disable: max-line-length
  ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEXXbFn0Q9OUAAAADklEQVR4AWMYRmAUjAIAAtAAAaW+yXMAAAAASUVORK5CYII='],
  // tslint:enable: max-line-length
  { type: 'image/png' },
);
FILE_BLOB['lastModifiedDate'] = new Date();
FILE_BLOB['name'] = 'foo';
jest.spyOn(FILE_BLOB, 'size', 'get').mockReturnValue(3 * 1024);
const FILE_MOCK = FILE_BLOB as File;


@Component({
  template: `
    <ts-file-upload
       [accept]="mimeTypes"
       [maximumKilobytesPerFile]="maxKb"
       [multiple]="multiple"
       [progress]="progress"
       [seedFile]="fileToSeed"
       [dimensionConstraints]="constraints"
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
  mimeTypes: TsFileAcceptedMimeTypes[] = ['image/png', 'image/jpg'];
  maxKb: number | undefined;
  multiple = true;
  progress: number | undefined;
  fileToSeed: File | undefined;
  constraints: TsFileImageDimensionConstraints | undefined;
  theme: TsStyleThemeTypes | undefined;

  @ViewChild(TsFileUploadComponent)
  component!: TsFileUploadComponent;

  userDragBegin = jest.fn();
  userDragEnd = jest.fn();
  handleFile = jest.fn().mockImplementation(() => console.log('IN HANDLE FILE'));
  handleMultipleFiles = jest.fn();
  cleared = jest.fn();
  /*
   *handleFile() { console.log('IN HANDLE FILE'); }
   */
}



describe(`TsFileUploadComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
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
    fixture = TestBed.createComponent(TestHostComponent);
    testComponent = fixture.componentInstance;
    component = testComponent.component;
  });


  describe(`seedFile`, () => {

    test(`should seed the file and trigger all process'`, (done) => {
      component.selected.emit = jest.fn();
      component['setUpNewFile'] = jest.fn();
      component.seedFile = FILE_MOCK;


      setTimeout(() => {
        expect(testComponent.handleFile).toHaveBeenCalled();
        /*
         *expect(component.selected.emit).toHaveBeenCalled();
         */
        done();
      }, 1000);
    });

  });

});
