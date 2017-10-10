import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { TsSearchComponent } from './search.component';


describe('TsSearchComponent', () => {

  beforeEach(() => {
    this.component = new TsSearchComponent(new FormBuilder());
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`ngOnInit()`, () => {

    it(`should seed the query with an initial value if one exists`, () => {
      const STRING = 'foo';
      this.component.initialValue = STRING;
      expect(this.component.query).toEqual('')

      this.component.ngOnInit();

      expect(this.component.searchForm.get('query').value).toEqual(STRING);
    });

  });


});
