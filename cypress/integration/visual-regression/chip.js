describe(`Chip Component`, () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/components/chip');
  });

  describe(`chip`, () => {
    it(`should load the chips`, () => {
      cy.get('.chip-collection').should('contain', 'pear');
      cy.get('#ts-chip-6 > .c-chip__remove > .c-icon').click().then(() => {
        cy.get('.chip-collection').should('not.contain', 'pear');
        cy.percySnapshot('Chip: remove one chip');
      });
    });

    it(`should allow disable chips`, () => {
      cy.get('.allow-disable > label > .ng-untouched').click(() => {
        cy.get('#ts-chip-3 > .c-chip__remove > .c-icon').should('not.exist');
      });
      cy.get('.allow-disable > label > .ng-untouched').click(() => {
        cy.get('#ts-chip-3 > .c-chip__remove > .c-icon').should('exist');
        cy.get('.allow-removal > label > .ng-untouched').click(() => {
          cy.get('#ts-chip-3 > .c-chip__remove > .c-icon').should('not.exist');
          cy.percySnapshot('Chip: disable state');
        });
      });
    });

    it(`should adjust layout based on orientation input`, () => {
      cy.get('.ts-chip-collection--vertical').should('not.exist');
      cy.get('.orientation').select('Vertical');
      cy.get('.ts-chip-collection--vertical').should('exist');
      cy.percySnapshot('Chip: vertical alignment');
    });

    it(`should be able to be selected`, () => {
      cy.get('#ts-chip-3').click().then(() => {
        cy.get('#ts-chip-3').type(' ');
        cy.percySnapshot('Chip: select a chip');
      })
    })

  })
});
