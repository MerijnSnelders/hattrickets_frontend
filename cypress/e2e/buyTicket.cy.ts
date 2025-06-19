describe('Buy Ticket Flow (Mocked)', () => {

  it('buys a ticket via mocked API', () => {
    cy.intercept('POST', '**/tickets/buy', {
      statusCode: 200,
      body: {
        id: 1,
        userId: 1,
        matchId: 1,
        price: 20.0,
      },
    }).as('mockBuyTicket');

    //should be logged in
    cy.visit('/match/1');

    cy.url().should('include', '/login');

    cy.get('input[id="email"]').type('test.test@gmail.com');

    cy.get('input[id="password"]').type('123');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/');

    cy.get('[href="/match/1"] > .flex > .w-full').click();

    cy.get('.grid > :nth-child(1)').click()

    cy.get('.max-w-xs > .w-full').click()

    // Wacht op de mock-aanroep
    cy.wait('@mockBuyTicket').its('request.body').should('include', {
      matchId: 1,
    });

    cy.contains('Ticket purchased!').should('exist')

    cy.window().then((win) => {
      const client = (win as any).seatSocketClient;
      const sockjs = (win as any).seatSockJS;

      // Deactiveer STOMP-client
      if (client?.active) {
        client.deactivate();
      }

      // Sluit ook SockJS transport direct
      if (sockjs?.readyState !== 3) { // 3 = CLOSED
        sockjs.close();
      }
    });

    cy.pause()
  });
});
