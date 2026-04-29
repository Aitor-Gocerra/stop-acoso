describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('muestra el hero con el título principal', () => {
    cy.contains('Tu voz importa.').should('be.visible');
    cy.contains('Tu seguridad es nuestra misión.').should('be.visible');
  });

  it('muestra las tres estadísticas', () => {
    cy.contains('6,5%').should('be.visible');
    cy.contains('20%').should('be.visible');
    cy.contains('5/5').should('be.visible');
  });

  it('el botón "Haz el test" navega a /test', () => {
    cy.contains('¿Necesitas ayuda? Haz el test').click();
    cy.url().should('include', '/test');
  });

  it('el botón "Chat anónimo ahora" navega a /login', () => {
    cy.visit('/');
    cy.contains('Chat anónimo ahora').click();
    cy.url().should('include', '/login');
  });

  it('muestra la sección de pilares', () => {
    cy.contains('Un ecosistema integral de protección').should('be.visible');
    cy.get('.pillar-card').should('have.length.greaterThan', 0);
  });

  it('muestra los pasos de cómo funciona', () => {
    cy.contains('¿Cómo funciona?').should('be.visible');
    cy.get('.step-card').should('have.length', 3);
  });

  it('muestra los casos reales', () => {
    cy.contains('Por qué este proyecto es urgente').should('be.visible');
    cy.get('.case-card').should('have.length', 3);
  });

  it('el CTA del test en mitad de página navega a /test', () => {
    cy.contains('Hacer el test ahora').click();
    cy.url().should('include', '/test');
  });
});
