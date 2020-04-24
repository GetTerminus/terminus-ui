describe(`Input`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/components/input');
  });
  describe(`datepicker`, () => {
    // Snapshot on when date picker opens up
    it(`should load the input page`, () => {
      cy.get('#ts-input-0').should('have.value', '02-02-2018');
      cy.percySnapshot('datepicker');
    });

    it(`should allow datepicker selection`, () => {
      // Snapshot on when date picker closes down after opens up
      cy.get('.ts-input .qa-datepicker-toggle .mat-datepicker-toggle-default-icon > path').first().click().then(() => {
        cy.percySnapshot('openUpDatePicker');
        cy.get('[aria-label="02-09-2018"] > .mat-calendar-body-cell-content').click().then(() => {
          cy.percySnapshot('closeDatePicker');
        });
      });
    });
  });

  describe(`input box`, () => {
    // Snapshot on label floating
    it(`should have floating label`, () => {
      cy.get('#ts-input-2').click();
      cy.percySnapshot('floatingLabel');
    });

    it(`should show validation`, () => {
      // Show first input field `Required` message by focus on it and then blur
      cy.get('#ts-input-2').click();
      cy.get('.page > :nth-child(3)').click();
      // Show second email input field `Invalid email address` message
      cy.get('#ts-input-3').type('a');
      cy.percySnapshot('emailValidationMessage');
    });

    it(`should show disabled mode if set to disabled`, () => {
      cy.get('.page > :nth-child(4)').click().then(() => {
       cy.get('#ts-input-2').should('be.disabled');
        cy.percySnapshot('disableMode');
      })
    })

    it(`should show value if input from textarea`, () => {
      cy.get('#ts-input-5').type('this is a test');
      cy.get('pre').contains('this is a test');
      cy.percySnapshot('textarea');
    })
  })

});
