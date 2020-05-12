describe(`Icon Component`, () => {
  it(`should load the icon page`, () => {
    cy.visit('http://localhost:4200/components/button');
    cy.percySnapshot('Icon: all icons');
  });
});
