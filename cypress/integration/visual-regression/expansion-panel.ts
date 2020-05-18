describe(`Button Component`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/components/expansion-panel');
  });

  describe(`expansion panel`, () => {
    it(`should do the simple panel`, () => {
      cy.get('#ts-expansion-panel-trigger-0').click().then(() => {
        cy.get('#cdk-accordion-child-0 > .ts-expansion-panel__body').contains('And here is my standard panel content.');
        cy.percySnapshot('Expansion Panel: Single Panel');
      });
    });

    it(`should expand if button set to collapsible`, () => {
      cy.get('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click().then(() => {
        cy.get('#ts-expansion-panel-trigger-1').click().then(() => {
          cy.get('#ts-expansion-panel-trigger-2').click().then(() => {
            cy.get('#ts-expansion-panel-trigger-3').click().then(() => {
              cy.get('#cdk-accordion-child-1 > .ts-expansion-panel__body').contains('This is my first panel content');
              cy.get('#cdk-accordion-child-2 > .ts-expansion-panel__body').contains('This is my second panel content');
              cy.get('#cdk-accordion-child-3 > .ts-expansion-panel__body').contains('This is my third panel content');
              cy.percySnapshot('Expansion Panel: Multiple expansion panels');
            });
          });
        });
      });
    });

    it(`should hide the panel if display set to false`, () => {
      cy.get('#ts-expansion-panel-trigger-12').should('exist');
      cy.get('#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container').click().then(() => {
        cy.get('#ts-expansion-panel-trigger-12').should('not.exist');
      });
    });

    it(`should act as a stepper when set`, () => {
      cy.get('.first-next').click().then(() => {
        cy.get('.first-previous').should('exist');
        cy.get('.second-next').click().then(() => {
          cy.get('.second-previous').should('exist');
          cy.percySnapshot('Expansion Panel: Accordion as a stepper');
          cy.get('.third-next').click().then(() => {
            cy.get('.first-next').should('not.be.visible');
            cy.get('.second-next').should('not.be.visible');
            cy.get('.first-previous').should('not.be.visible');
          });
        });
      });
    });

    it('should not have a shadow or padding when transparent mode is on', () => {
      cy.get('#ts-expansion-panel-trigger-11 .ts-expansion-panel--shadow').should('not.exist');
      cy.get('#ts-expansion-panel-trigger-11').click(() => {
        cy.percySnapshot('Expansion Panel: Transparent mode');
      });
    });
  });
});
