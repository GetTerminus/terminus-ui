import { TsSortDirective } from './sort.directive';


// Adding tests for areas missed by the TsTable integration tests
describe(`TsSortDirective`, () => {

  beforeEach(() => {
    this.directive = new TsSortDirective();
  });


  describe(`getNextSortDirection()`, () => {

    it(`should return an empty string if no 'sortable' was passed in`, () => {
      expect(this.directive.getNextSortDirection(null)).toEqual('');
    });

  });

});
