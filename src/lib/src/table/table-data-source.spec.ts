import { TsTableDataSource } from './table-data-source';


// Additional tests for parts missed by the {@link TsTableComponent} integration test
describe(`TsTableDataSource`, () => {

  describe(`if no data is passed in`, () => {

    test(`should initialize an empty array`, () => {
      this.source = new TsTableDataSource();

      expect(this.source.data).toEqual([]);
    });

  });


  describe(`in _renderChangesSubscription exists`, () => {

    test(`should be unsubscribed from`, () => {
      const spy = jest.spyOn(this.source._renderChangesSubscription, 'unsubscribe');

      this.source._updateChangeSubscription();

      expect(spy).toHaveBeenCalled();
    });

  });

});
