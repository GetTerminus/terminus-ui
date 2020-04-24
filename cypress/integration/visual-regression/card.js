describe(`Card Component`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/components/card');
  })
  describe(`interaction`, () => {
    it(`should support interaction when set to true`, () => {
      cy.get('#interaction').click().then(() => {
        cy.get('#ts-card-0 > .mat-ripple').click();
        cy.percySnapshot('interaction');
      })
    });
  });

  describe(`center`, () => {
    it(`should center text when set to true`, () => {
      cy.get('#center').click().then(() => {
        cy.get('#ts-card-0').should('have.class', 'c-card--centered');
        cy.percySnapshot('center');
      });
    });
  });

  describe(`flat`, () => {
    it(`should have flat class set when flat flag set to true`, () => {
      cy.get('#flat').click().then(() => {
        cy.get('#ts-card-0').should('have.class', 'c-card--flat');
        cy.percySnapshot('flat');
      });
    });
  });

  describe(`border and color`, () => {
    it(`should set border color accordingly`, () => {
      cy.get('#border').select('bottom');
      cy.get('#ts-card-0').should('have.class', 'c-card--border-bottom');
      cy.percySnapshot('bottom-border');
    });

    it(`should set right color`, () => {
      cy.get('#theme').select('warn');
      cy.get('#border').select('top');
      cy.get('#ts-card-0').should('have.class', 'c-card--warn', 'c-card--border-top');
      cy.percySnapshot('top-border');
    });
  });

  describe(`utility menu`, () => {
    it(`should show utility menu when clicked`, () => {
      cy.get('#ts-card-1 > .ts-menu > .c-menu > .mat-focus-indicator > .mat-button-wrapper > .ts-icon > .mat-icon').click().then(() => {
        cy.get('.mat-menu-panel').contains('My menu item');
        cy.percySnapshot('utility');
      });
    });

  })
})
