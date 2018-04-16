import { TsSortDirective } from './sort.directive';


// Adding tests for areas missed by the TsTable integration tests
describe(`TsSortDirective`, () => {
  let directive: TsSortDirective;

  beforeEach(() => {
    directive = new TsSortDirective();
  });


  describe(`getNextSortDirection()`, () => {

    it(`should return an empty string if no 'sortable' was passed in`, () => {
      expect(directive.getNextSortDirection(null as any)).toEqual('');
    });

  });

});
