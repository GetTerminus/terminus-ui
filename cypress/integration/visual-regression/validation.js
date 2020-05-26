describe(`Validation Message Component`, () => {

  before(() => {
    cy.visit('http://localhost:4200/components/validation');
  });

  it(`should show custom validation message not default one when custom validation passed in`, () => {
    cy.get('#ts-input-0').type('me').blur();
    cy.get('#ts-validation-messages-0').contains('Sorry, only Hotmail or MySpace addresses supported');
    cy.get('.ts-validation-messages').should('not.contain', 'Invalid email address');

    cy.get('#ts-input-1').type('me').blur();
    cy.get('.ts-validation-messages').should('contain', 'Invalid email address');

    cy.get('#ts-input-2').type('abcd').blur();
    cy.get('.ts-validation-messages').should('contain', 'Password must be between 6 and 100 characters, and contain a number');

    cy.get('#ts-input-3').type('1234').blur();
    cy.get('.ts-validation-messages').should('contain', 'Invalid credit card number');

    cy.get('.mat-datepicker-toggle-default-icon').click().then(() => {
      cy.get('[aria-label="01-01-2018"] > .mat-calendar-body-cell-content').click();
      cy.get('.ts-validation-messages').should('contain', 'Date must be after 01-05-2018');
    });

    cy.get('#ts-input-5').type('11').blur();
    cy.get('.ts-validation-messages').should('contain', '11 must be less than 10');
    cy.get('#ts-input-6').type('6').blur();
    cy.get('.ts-validation-messages').should('contain', '6 must be greater than 10');

    cy.get('#ts-input-7').type('6').blur();
    cy.get('.ts-validation-messages').should('contain', 'Must be between 10 and 100');

    cy.get('#ts-input-8').type('abc').blur();
    cy.get('.ts-validation-messages').should('contain', 'Must contain at least 4 lowercase letters');

    cy.get('#ts-input-9').type('ABC').blur();
    cy.get('.ts-validation-messages').should('contain', 'Must contain at least 4 uppercase letters');

    cy.get('#ts-input-10').type('12a').blur();
    cy.get('.ts-validation-messages').should('contain', 'Must contain at least 4 numbers');

    cy.get('#ts-input-11').type('foo.com').blur();
    cy.get('.ts-validation-messages').should('contain', "'foo.com' must be a valid URL");

    cy.get('#ts-input-12').type('http://foo').blur();
    cy.get('.ts-validation-messages').should('contain', "'http://foo' must be a valid domain");

    cy.get('#ts-input-15').type('6').blur();
    cy.get('#ts-input-16').type('5').blur();
    cy.get('.ts-validation-messages').should('contain', '5 must be greater than 6');

    cy.get('#ts-input-17').type('food').blur();
    cy.get('.ts-validation-messages').should('contain', 'food is not an accepted item');

    cy.get('#ts-input-18').type('{"name": "fooo"}', { parseSpecialCharSequences: false }).blur();
    cy.get('.ts-validation-messages').should('contain', '{"name": "fooo"} is not an accepted item');

    cy.percySnapshot('Validation Message: all validation messages');
  });

});
