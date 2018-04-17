import { TsTableDataSource } from './table-data-source';


interface Foo {
  [key: string]: any;
}

// Additional tests for parts missed by the {@link TsTableComponent} integration test
describe(`TsTableDataSource`, () => {
  let source: TsTableDataSource<Foo>;

  beforeEach(() => {
    source = new TsTableDataSource();
  });


  describe(`if no data is passed in`, () => {

    test(`should initialize an empty array`, () => {
      expect(source.data).toEqual([]);
    });

  });


  describe(`in _renderChangesSubscription exists`, () => {

    test(`should be unsubscribed from`, () => {
      const spy = jest.spyOn(source._renderChangesSubscription, 'unsubscribe');
      source._updateChangeSubscription();

      expect(spy).toHaveBeenCalled();
    });

  });

});
