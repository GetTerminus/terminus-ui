import { FormControl } from '@angular/forms';

import { inCollectionValidator } from './inCollection';

describe(`inCollectionValidator`, function() {
  const myCollectionFn = a => a.name;
  const shallowCollection = ['foo', 'bar', 'baz'];
  const deepCollection = [
    {
      name: 'foo',
      id: 1,
    },
    {
      name: 'bar',
      id: 2,
    },
    {
      name: 'baz',
      id: 3,
    },
  ];

  test(`should return null if no control is passed in`, () => {
    const validatorFn = inCollectionValidator(shallowCollection);

    expect(validatorFn(undefined as any)).toBeNull();
  });

  test(`should return null if no collection is passed in`, () => {
    const validatorFn = inCollectionValidator(undefined as any);

    expect(validatorFn(new FormControl('foo'))).toBeNull();
  });

  test(`should return null if an empty collection is passed in`, () => {
    const validatorFn = inCollectionValidator([]);

    expect(validatorFn(new FormControl('foo'))).toBeNull();
  });

  describe(`shallowCollection`, () => {
    test(`should return null if the value is valid`, () => {
      const validatorFn = inCollectionValidator(shallowCollection);

      expect(validatorFn(new FormControl('foo'))).toBeNull();
    });

    test(`should return an error object if invalid`, () => {
      const validatorFn = inCollectionValidator(shallowCollection);
      const result = validatorFn(new FormControl('fo'));

      expect(result?.inCollection.valid).toEqual(false);
      expect(result?.inCollection.actual).toEqual('fo');
    });
  });

  describe(`deepCollection`, () => {
    const obj = {
      name: 'bar',
      id: 2,
    };

    test(`should return null if the value is valid`, () => {
      const validatorFn = inCollectionValidator(deepCollection, myCollectionFn);

      expect(validatorFn(new FormControl(obj))).toBeNull();
    });

    test(`should return an error object if invalid`, () => {
      const validatorFn = inCollectionValidator(deepCollection, myCollectionFn);
      const result = validatorFn(new FormControl('234'));

      expect(result?.inCollection.valid).toEqual(false);
      expect(result?.inCollection.actual).toEqual('234');
    });
  });
});
