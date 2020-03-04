// import Color from 'color';

describe(`Button`, () => {
  it(`should load buttons`, () => {
    cy.visit('http://localhost:4200/components/button');
    cy.get(':nth-child(1) > label > .ng-pristine').contains('Primary');
    cy.get('[tsverticalspacing="small--0"]').contains('Click Me!');
    // primary color converter
    // const expectBackgroundColor = Color('#00538a').string();
    // // cy.get('.c-button').should('have.css', 'background-color', expectBackgroundColor);
    // cy.get('#title').contains('T');
    // cy.get('[tsverticalspacing="small--0"] > .ts-button > .c-button > .mat-button-wrapper > .c-button__content').click();
    // cy.percySnapshot();
  });

});
