describe('Test de Autodiagnóstico', () => {
  beforeEach(() => {
    cy.visit('/test');
  });

  it('muestra la pantalla de intro antes de empezar', () => {
    cy.contains('¿Estás sufriendo acoso?').should('be.visible');
    cy.contains('Comenzar el test').should('be.visible');
    cy.get('.question-panel').should('not.exist');
  });

  it('muestra los indicadores de privacidad en la intro', () => {
    cy.contains('100% privado').should('be.visible');
    cy.contains('Solo 2 minutos').should('be.visible');
    cy.contains('Validado').should('be.visible');
    cy.contains('Acción directa').should('be.visible');
  });

  it('al pulsar "Comenzar el test" aparece la primera pregunta', () => {
    cy.contains('Comenzar el test').click();
    cy.get('.question-panel').should('be.visible');
    cy.contains('Pregunta 1 de 10').should('be.visible');
    cy.get('.answer-yes').should('be.visible');
    cy.get('.answer-no').should('be.visible');
  });

  it('responder avanza a la siguiente pregunta', () => {
    cy.contains('Comenzar el test').click();
    cy.contains('Pregunta 1 de 10').should('be.visible');
    cy.get('.answer-no').click();
    cy.contains('Pregunta 2 de 10').should('be.visible');
  });

  it('el botón "Volver a la anterior" no aparece en la primera pregunta', () => {
    cy.contains('Comenzar el test').click();
    cy.get('.back-btn').should('not.exist');
  });

  it('el botón "Volver a la anterior" aparece desde la segunda pregunta', () => {
    cy.contains('Comenzar el test').click();
    cy.get('.answer-no').click();
    cy.get('.back-btn').should('be.visible').and('contain', 'Volver a la anterior');
  });

  it('el botón volver retrocede una pregunta', () => {
    cy.contains('Comenzar el test').click();
    cy.get('.answer-no').click();
    cy.contains('Pregunta 2 de 10').should('be.visible');
    cy.get('.back-btn').click();
    cy.contains('Pregunta 1 de 10').should('be.visible');
  });

  it('completar el test con todas "No" muestra resultado VERDE (Leve)', () => {
    const respuestas = new Array(10).fill(false);
    cy.completarTest(respuestas);
    cy.get('.result-panel').should('be.visible');
    cy.contains('NIVEL VERDE').should('be.visible');
    cy.contains('Leve / Alerta').should('be.visible');
  });

  it('completar el test con 5 "Sí" muestra resultado AMARILLO (Moderado)', () => {
    cy.contains('Comenzar el test').click();
    for (let i = 0; i < 5; i++) {
      cy.get('.answer-yes').click();
    }
    for (let i = 0; i < 5; i++) {
      cy.get('.answer-no').click();
    }
    cy.get('.result-panel').should('be.visible');
    cy.contains('NIVEL AMARILLO').should('be.visible');
    cy.contains('Moderado').should('be.visible');
  });

  it('completar el test con todas "Sí" muestra resultado ROJO (Grave)', () => {
    const respuestas = new Array(10).fill(true);
    cy.completarTest(respuestas);
    cy.get('.result-panel').should('be.visible');
    cy.contains('NIVEL ROJO').should('be.visible');
    cy.contains('Grave').should('be.visible');
  });

  it('el resultado grave muestra el botón de chat anónimo', () => {
    const respuestas = new Array(10).fill(true);
    cy.completarTest(respuestas);
    cy.contains('Iniciar chat anónimo ahora').should('be.visible');
  });

  it('"Repetir el test" vuelve a la pantalla de intro', () => {
    const respuestas = new Array(10).fill(false);
    cy.completarTest(respuestas);
    cy.contains('Repetir el test').click();
    cy.contains('¿Estás sufriendo acoso?').should('be.visible');
    cy.get('.result-panel').should('not.exist');
  });

  it('"Ver teléfonos de ayuda" en el resultado navega a /telefonos', () => {
    const respuestas = new Array(10).fill(false);
    cy.completarTest(respuestas);
    cy.contains('Ver teléfonos de ayuda').click();
    cy.url().should('include', '/telefonos');
  });

  it('la barra de progreso avanza al responder', () => {
    cy.contains('Comenzar el test').click();
    cy.get('.progress-fill').should('have.css', 'width', '0px');
    cy.get('.answer-no').click();
    cy.get('.progress-fill').should('not.have.css', 'width', '0px');
  });
});
