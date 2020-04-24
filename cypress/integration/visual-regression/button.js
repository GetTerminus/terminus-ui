describe(`Button Component`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/components/button');
  });

  describe(`button`, () => {
    it(`should load the page`, () => {
      cy.get('body').contains('Themes');
      cy.get('#ts-button-id-1 > .mat-button-wrapper > .c-button__content').contains('Primary');
      cy.get('.c-button__content > .ts-icon > .c-icon').click();
      cy.percySnapshot('button overview');
    });

    it(`should expand if button set to collapsible`, () => {
      cy.get('.mat-button-wrapper > .ts-icon > .mat-icon').click().then(() => {
        cy.get('.c-button__content').contains('New Campaign / New Tactic').should('be.visible');
        cy.percySnapshot('expanded button');
      })
    })
  })
});
