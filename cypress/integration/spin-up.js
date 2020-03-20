describe(`Demo`, () => {
  it(`should load the page`, () => {
    cy.visit('http://localhost:4200/');
    cy.get('body').contains('Themes');
    cy.get('#ts-button-id-1 > .mat-button-wrapper > .c-button__content').contains('Primary');
    cy.percySnapshot();
  });
});
