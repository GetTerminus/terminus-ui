describe(`Paginator Component`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/components/paginator');
  });

  describe(`paginator`, () => {
    it(`should load the page`, () => {
      cy.get('.current-page').contains('0')
      cy.get('.zero-based').click().then(() => {
        cy.get('.current-page').contains('1');
        cy.percySnapshot('Paginator: zero based');
      });
    });

    it(`should switch to simple mode`, () => {
      cy.get('.simple-mode').click().then(() => {
        cy.percySnapshot('Paginator: simple mode');
      });
    });

    it(`should jump to the page as input`, () => {
      cy.get('.current-page').select('1').then(() => {
        cy.get('#ts-button-4 > .mat-button-wrapper > .c-button__content').contains('11 - 20 of 114');
        cy.percySnapshot('Paginator: jump to page');
      });
    });

  })
});
