import { TsLinkComponent } from './link.component';


describe(`TsLinkComponent`, function() {
  let component: TsLinkComponent;

  beforeEach(() => {
    component = new TsLinkComponent();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`isExternal`, () => {
    it(`should set and retrieve`, () => {
      component.isExternal = true;
      expect(component.isExternal).toEqual(true);
    });
  });

});
