describe('Home Page', () => {
  it('should load and show header text', () => {
    cy.visit('http://localhost:5173'); // Or the correct port for Vite
    cy.contains('Featured Matches').should('exist');
  });
});