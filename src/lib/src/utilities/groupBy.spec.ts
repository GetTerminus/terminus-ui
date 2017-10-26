import { groupBy } from './groupBy';

const myArray = [
  {
    id: 4,
    type: 'foo',
    isAdmin: false,
  },
  {
    id: 2,
    type: 'foo',
    isAdmin: true,
  },
  {
    id: 29,
    type: 'bar',
    isAdmin: false,
  },
  {
    id: 52,
    type: 'baz',
    isAdmin: true,
  },
];


describe(`groupBy()`, () => {

  it(`should return an object container separated arrays`, () => {
    const grouped = groupBy(myArray, 'type');
    expect(grouped.foo.length).toEqual(2);
    expect(grouped.bar.length).toEqual(1);
    expect(grouped.baz.length).toEqual(1);

    const grouped2 = groupBy(myArray, 'isAdmin');
    expect(grouped2.true.length).toEqual(2);
    expect(grouped2.false.length).toEqual(2);
  });

});
