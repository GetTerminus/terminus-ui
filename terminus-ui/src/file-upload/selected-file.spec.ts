
import { TsFileAcceptedMimeTypes } from './mime-types';
import { TsFileImageDimensionConstraints } from './image-dimension-constraints';
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
      min: 100,
      max: 100,
    },
    width: {
      min: 100,
      max: 100,
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

// CSV MOCK
const FILE_CSV_BLOB = new Blob(
  ['my csv value'],
  { type: 'text/csv' },
);
FILE_CSV_BLOB['lastModifiedDate'] = new Date();
FILE_CSV_BLOB['name'] = 'myCSV';
jest.spyOn(FILE_CSV_BLOB, 'size', 'get').mockReturnValue(3 * 1024);
const FILE_CSV_MOCK = FILE_CSV_BLOB as File;

// VIDEO MOCK
const FILE_VIDEO_BLOB = new Blob(
  ['my video value'],
  { type: 'video/mp4' },
);
FILE_VIDEO_BLOB['lastModifiedDate'] = new Date();
FILE_VIDEO_BLOB['name'] = 'myVideo';
jest.spyOn(FILE_VIDEO_BLOB, 'size', 'get').mockReturnValue(3 * 1024);
const FILE_VIDEO_MOCK = FILE_VIDEO_BLOB as File;




describe(`TsSelectedFile`, () => {
  let newSelectedFile: TsSelectedFile;
  const createFile = (
    file = FILE_MOCK,
    constraints: TsFileImageDimensionConstraints | undefined = CONSTRAINTS_MOCK,
    types: TsFileAcceptedMimeTypes[] = ['image/png', 'image/jpg'],
    size = (10 * 1024),
    ratio = [{ widthRatio: 1, heightRatio: 1 }],
  ): TsSelectedFile => {
    return newSelectedFile = new TsSelectedFile(
      file,
      constraints ? constraints : undefined,
      types,
      size,
      ratio,
    );
  };


  // Mock `FileReader` and `Image`:
  beforeEach(() => {
    // Mock FileReader
    class DummyFileReader {
      onload = jest.fn();
      addEventListener = jest.fn();
      readAsDataURL = jest.fn().mockImplementation(function(this: FileReader) { this.onload({} as Event); });
      // tslint:disable: max-line-length
      result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAAA1BMVEXXbFn0Q9OUAAAADklEQVR4AWMYRmAUjAIAAtAAAaW+yXMAAAAASUVORK5CYII=';
      // tslint:enable: max-line-length
    }
    // Not sure why any is needed
    (window as any).FileReader = jest.fn(() => new DummyFileReader);


    class DummyImage {
      _onload = () => {};
      set onload(fn) { this._onload = fn; }
      get onload() { return this._onload; }
      set src(source) {
        this.onload();
      }
      get naturalWidth() { return 100; }
      get naturalHeight() { return 100; }
    }
    (window as any).Image = jest.fn(() => new DummyImage());

  });


  describe(`constructor`, () => {

    test(`should set top-level items and validations`, () => {
      const file = createFile();
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.mimeType).toEqual('image/png');
          expect(f.size).toEqual(3);
          expect(f.name).toEqual('foo');
          expect(f.validations.fileType).toEqual(true);
          expect(f.validations.fileSize).toEqual(true);
          expect(f.validations.imageDimensions).toEqual(true);
        }
      });
      expect.assertions(6);
    });


    test(`should set top-level items and validations for videos`, (done) => {
      const file = createFile(FILE_VIDEO_MOCK, undefined, ['video/mp4']);
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.mimeType).toEqual('video/mp4');
          expect(f.size).toEqual(3);
          expect(f.name).toEqual('myVideo');
          expect(f.validations.fileType).toEqual(true);
          expect(f.validations.fileSize).toEqual(true);
          expect(f.validations.imageDimensions).toEqual(true);
        }
      });
      expect.assertions(6);
      done();
    });

  });


  describe(`width`, () => {

    test(`should return the width or zero`, () => {
      const file = createFile();
      expect(file.width).toEqual(100);

      file.dimensions = undefined;
      expect(file.width).toEqual(0);
    });

  });


  describe(`height`, () => {

    test(`should return the height or zero`, () => {
      const file = createFile();
      expect(file.height).toEqual(100);

      file.dimensions = undefined;
      expect(file.height).toEqual(0);
    });

  });


  describe(`isCSV`, () => {

    test(`should return true is the file is a CSV`, () => {
      const file = createFile(FILE_CSV_MOCK);
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.isCSV).toEqual(true);
        }
      });
      expect.assertions(1);
    });

  });


  describe(`isImage`, () => {

    test(`should return true is the file is an image`, () => {
      const file = createFile();
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(file.isImage).toEqual(true);
        }
      });
    });

  });


  describe(`isVideo`, () => {

    test(`should return true is the file is a video`, () => {
      const file = createFile(FILE_VIDEO_MOCK);
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.isVideo).toEqual(true);
        }
      });
      expect.assertions(1);
    });

  });


  describe(`fileContents`, () => {

    test(`should return the FileReader result`, () => {
      const file = createFile();
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.fileContents.indexOf('data:image')).toBeGreaterThanOrEqual(0);
        }
      });

      expect.assertions(1);
    });

  });


  describe(`isValid`, () => {

    test(`should return true if all validations are true`, () => {
      const file = createFile();
      file.validations.fileType = true;
      file.validations.fileSize = false;
      file.validations.imageDimensions = true;

      expect(file.isValid).toEqual(false);

      file.validations.fileSize = true;
      expect(file.isValid).toEqual(true);
    });

  });


  describe(`determineImageDimensions`, () => {

    test(`should set validation to true and exit if the file is not an image`, (done) => {
      const file = createFile(FILE_CSV_MOCK);
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.dimensions).toBeFalsy();
          expect(f.height).toEqual(0);
          expect(f.width).toEqual(0);
          expect(f.validations.imageDimensions).toEqual(true);
          done();
        }
      });
      expect.assertions(4);
    });


    test(`should still seed the FileReader for non-image files`, (done) => {
      const file = createFile(FILE_CSV_MOCK);
      file.fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.fileContents).toBeTruthy();
          done();
        }
      });
      expect.assertions(1);
    });


    test(`should set dimensions and call callback`, () => {
      createFile().fileLoaded$.subscribe((f) => {
        if (f) {
          expect(f.dimensions).toBeTruthy();
          expect(f.height).toBeGreaterThan(1);
          expect(f.width).toBeGreaterThan(1);
          expect(f.validations.imageDimensions).toEqual(true);
        }
      });
      expect.assertions(4);
    });

  });


  describe(`validateImageRatio`, () => {

    test(`should return true if no constraints exist`, () => {
      const file = createFile();
      expect(file['validateImageRatio'](undefined)).toEqual(true);
    });


    test(`should return true if ratio are valid`, () => {
      const file = createFile();
      const result = file['validateImageRatio']([{widthRatio: 1, heightRatio: 1}]);
      expect(result).toEqual(true);
    });


    test(`should return false if ratio are not valid`, () => {
      const file = createFile();
      const result = file['validateImageRatio']([{ widthRatio: 2, heightRatio: 1 }]);
      expect(result).toEqual(false);
    });

  });

  describe(`validateImageDimensions`, () => {

    test(`should return true if no constraints exist`, () => {
      const file = createFile();
      expect(file['validateImageDimensions'](undefined)).toEqual(true);
    });


    test(`should return true if dimensions are valid`, () => {
      const file = createFile();
      const result = file['validateImageDimensions'](CONSTRAINTS_MOCK);
      expect(result).toEqual(true);
    });


    test(`should return false if dimensions are not valid`, () => {
      const file = createFile();
      const constraints = [
        {
          height: {
            min: 150,
            max: 200,
          },
          width: {
            min: 150,
            max: 200,
          },
        },
        {
          height: {
            min: 100,
            max: 100,
          },
          width: {
            min: 150,
            max: 200,
          },
        },
      ];
      const result = file['validateImageDimensions'](constraints);
      expect(result).toEqual(false);
    });

  });

});
