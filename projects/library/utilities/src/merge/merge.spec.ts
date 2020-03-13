import { merge } from './merge';

describe(`merge`, function() {
  const obj1 = {
    key1: {},
    key2: 'test',
    key3: [5, 2, 76, 21],
    key4: { key4a: 'foo' },
  };
  const obj2 = {
    key1: {
      ik1: 'hello',
      ik2: 'world',
      ik3: 3,
    },
    key4: { key4b: 'bar' },
  };
  const expected = {
    key1: {
      ik1: 'hello',
      ik2: 'world',
      ik3: 3,
    },
    key2: 'test',
    key3: [5, 2, 76, 21],
    key4: {
      key4a: 'foo',
      key4b: 'bar',
    },
  };

  test(`should merge two objects without deleting properties`, () => {
    expect(merge(obj1, obj2)).toEqual(expected);
  });
});
