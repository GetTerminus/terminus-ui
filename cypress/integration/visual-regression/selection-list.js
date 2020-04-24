describe(`Selection List`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/components/selection-list');
  })
  describe(`seed input`, () => {
    describe(`seed the selections`, () => {
      it(`should update multi select chips`, () => {
        cy.get('.page > :nth-child(1)').click().then(() => {
          cy.get(':nth-child(6) > :nth-child(3)').contains('Alabama');
          cy.percySnapshot('seed multi selection');
        });
      });

      it(`should update single selection`, () => {
        cy.get('div[style="margin-bottom: 1rem;"] > button').click().then(() => {
          cy.get(':nth-child(7) > :nth-child(4)').contains('Delaware');
          cy.percySnapshot('seed single selection');
        });
      });
    });

    describe(`manual input`, () => {
      it(`should allow users input in multi selection`, () => {
        cy.get('#ts-selection-list-0').click().then((c) => {
          cy.percySnapshot('multi drop down menu');
          cy.get('#ts-selection-list-0').type('{downarrow}{enter}');
          cy.get('.ts-selection-list--multiple > .ts-form-field > .ts-form-field__wrapper > .ts-form-field__container').contains('Alaska');
        });
      });

      it(`should allow users input in single selection`, () => {
        cy.get('div[style="margin-bottom: 1rem;"] > :nth-child(5) > .ng-untouched').click();
        cy.get('#ts-selection-list-1').click().then(() => {
          cy.percySnapshot('single drop down menu');
          cy.get('#ts-selection-list-1').type('{uparrow}{enter}', { force: true });
          cy.get('#ts-selection-list-1').invoke('text').then(() => cy.contains('Georgia'));
        });
      });
    });

    describe(`disable state`, () => {
      it(`should disable without any itemsselected`, () => {
        cy.get('.page > :nth-child(3) > .ng-untouched').click().then(() => {
          cy.get('#ts-selection-list-0').should('be.disabled');
          cy.percySnapshot('selectionlist disabled');
        });
      });
    });
  });
});
