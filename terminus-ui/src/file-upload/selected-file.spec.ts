
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
      min: 72,
      max: 72,
    },
    width: {
      min: 72,
      max: 72,
    },
  },
];

const blob = new Blob([window.btoa('myFakeImageContent')], { type: 'image/png' });
blob['lastModifiedDate'] = new Date();
blob['name'] = 'foo';
jest.spyOn(blob, 'size', 'get').mockReturnValue(3 * 1024);
const FILE_MOCK = blob as File;


describe(`TsSelectedFile`, () => {
  let newSelectedFile: TsSelectedFile;
  const createFile = (
    file = FILE_MOCK,
    constraints = CONSTRAINTS_MOCK,
    types: TsFileAcceptedMimeTypes[] = ['image/png', 'image/jpg'],
    size = (10 * 1024),
  ): TsSelectedFile => {
    return newSelectedFile = new TsSelectedFile(
      file,
      constraints,
      types,
      size,
    );
  };


  describe(`constructor`, () => {

    /*
     *beforeEach(() => {
     *});
     */

    // TODO: test if constraints or size isn't passed in

    test(`should set top-level items`, () => {
      jest.useFakeTimers();
      const file = createFile();
      expect(file.mimeType).toEqual('image/png');
      expect(file.size).toEqual(3);
      expect(file.name).toEqual('foo');
      jest.advanceTimersByTime(1000);
      console.log('file: ', file);
      expect(file.validations.fileType).toEqual(true);
      expect(file.validations.fileSize).toEqual(true);

      /*
       *setTimeout(() => {
       *  done();
       *}, 10);
       */
    });


    /*
     *test(`should set validations`, () => {
     *});
     */

  });


/*
 *  describe(`width`, () => {
 *
 *    test(`should return the width or zero`, () => {
 *    });
 *
 *  });
 */


/*
 *  describe(`height`, () => {
 *
 *    test(`should return the height or zero`, () => {
 *    });
 *
 *  });
 */


/*
 *  describe(`isCSV`, () => {
 *
 *    test(`should return true is the file is a CSV`, () => {
 *    });
 *
 *  });
 */


/*
 *  describe(`isImage`, () => {
 *
 *    test(`should return true is the file is an image`, () => {
 *    });
 *
 *  });
 */


/*
 *  describe(`fileContents`, () => {
 *
 *    test(`should return the FileReader result`, () => {
 *    });
 *
 *  });
 */


/*
 *  describe(`isValid`, () => {
 *
 *    test(`should return true if all validations are true`, () => {
 *    });
 *
 *  });
 */


/*
 *  describe(`determineImageDimensions`, () => {
 *
 *    test(`should set validation to true and exit if the file is not an image`, () => {
 *      // set dimensions
 *      // set imageDimensions validation
 *      // call callback
 *      // cleanup observables?
 *    });
 *
 *
 *    test(`should set dimensions and call callback`, () => {
 *    });
 *
 *  });
 */


/*
 *  describe(`validateImageDimensions`, () => {
 *
 *    test(`should return true if dimensions are valid`, () => {
 *    });
 *
 *  });
 */


});
