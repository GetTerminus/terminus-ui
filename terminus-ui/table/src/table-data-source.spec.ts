/* eslint-disable no-underscore-dangle */
import { TsTableDataSource } from './table-data-source';


interface Foo {
  [key: string]: any;
}


// Additional tests for parts missed by the {@link TsTableComponent} integration test
describe(`TsTableDataSource`, function() {
  let source: TsTableDataSource<Foo>;
  let seededSource: TsTableDataSource<any>;

  beforeEach(() => {
    source = new TsTableDataSource();
    seededSource = new TsTableDataSource([{ foo: 'bar' }]);
  });

  test(`should initialize an empty array if no data passed in`, () => {
    expect(source.data).toEqual([]);
    expect(seededSource.data).toEqual([{ foo: 'bar' }]);
  });

  describe(`in _renderChangesSubscription exists`, () => {

    test(`should be unsubscribed from`, () => {
      const spy = jest.spyOn(source._renderChangesSubscription, 'unsubscribe');
      source._updateChangeSubscription();

      expect(spy).toHaveBeenCalled();
    });

  });

  test(`should have a disconnected() noop`, () => {
    expect(source.disconnect()).toEqual(undefined);
  });

});
