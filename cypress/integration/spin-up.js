describe(`Demo`, () => {
  it(`should load demo page`, () => {
    cy.visit('http://localhost:4200/');
    cy.get('body').contains('Demos');
  });

  it(`should load button page`, () => {
    cy.visit('http://localhost:4200/components/button');
    cy.get(':nth-child(1) > label > .ng-pristine').contains('Primary');
    cy.get('[tsverticalspacing="small--0"]').contains('Click Me!');
  });

});
