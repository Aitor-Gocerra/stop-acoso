declare global {
  namespace Cypress {
    interface Chainable {
      completarTest(respuestas: boolean[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add('completarTest', (respuestas: boolean[]) => {
  cy.get('.btn-accent.btn-lg').click();
  respuestas.forEach((respuesta) => {
    const selector = respuesta ? '.answer-yes' : '.answer-no';
    cy.get(selector).click();
  });
});

export {};
