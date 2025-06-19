describe('Login Page', () => {
  it('logs in successfully with valid credentials', () => {
    cy.visit('/login');

    cy.get('input[id="email"]').type('test.test@gmail.com');

    cy.get('input[id="password"]').type('123');

    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');

    cy.url().should('include', '/');

  });

  it('shows error with invalid credentials', () => {
    cy.visit('/login');

    cy.get('input[id="email"]').type('wrong@test.com');
    cy.get('input[id="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
  });
});
