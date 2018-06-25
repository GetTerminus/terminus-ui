
import { TsFileImageDimensionConstraints } from './image-dimension-constraints';


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


/*
 *@Component({
 *  template: `
 *    <ts-file-upload
 *       [accept]="mimeTypes"
 *       [maximumKilobytesPerFile]="maxKb"
 *       [multiple]="multiple"
 *       [progress]="progress"
 *       [seedFile]="fileToSeed"
 *       [dimensionConstraints]="constraints"
 *       [theme]="theme"
 *       (enter)="userDragBegin($event)"
 *       (exit)="userDragEnd($event)"
 *       (selected)="handleFile($event)"
 *       (selectedMultiple)="handleMultipleFiles($event)"
 *       (cleared)="cleared($event)"
 *    ></ts-file-upload>
 *  `,
 *})
 *class TestHostComponent {
 *  mimeTypes: TsFileAcceptedMimeTypes[] = ['image/png', 'image/jpg'];
 *  maxKb: number | undefined;
 *  multiple = true;
 *  progress: number | undefined;
 *  fileToSeed: File | undefined;
 *  constraints: TsFileImageDimensionConstraints | undefined;
 *  theme: TsStyleThemeTypes | undefined;
 *
 *  @ViewChild(TsFileUploadComponent)
 *  component!: TsFileUploadComponent;
 *
 *  userDragBegin = jest.fn();
 *  userDragEnd = jest.fn();
 *  handleFile = jest.fn();
 *  handleMultipleFiles = jest.fn();
 *  cleared = jest.fn();
 *}
 */



describe(`TsFileUploadComponent`, () => {
});
