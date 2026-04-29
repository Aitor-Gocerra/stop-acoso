describe('Navegación entre rutas', () => {
  const rutas = [
    { path: '/', selector: '.hero', descripcion: 'Home' },
    { path: '/login', selector: '.login-page', descripcion: 'Login' },
    { path: '/test', selector: '.test-page', descripcion: 'Test' },
    { path: '/chat', selector: '.chat-page', descripcion: 'Chat' },
    { path: '/recursos', selector: '.recursos-header', descripcion: 'Recursos' },
    { path: '/telefonos', selector: '.tel-header', descripcion: 'Teléfonos' },
    { path: '/panel-docente', selector: '.panel-page', descripcion: 'Panel docente' },
  ];

  rutas.forEach(({ path, selector, descripcion }) => {
    it(`navega correctamente a ${descripcion} (${path})`, () => {
      cy.visit(path);
      cy.get(selector).should('exist');
    });
  });

  it('una ruta desconocida redirige al home', () => {
    cy.visit('/ruta-inexistente');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('.hero').should('exist');
  });

  it('la barra de navegación del home lleva al test', () => {
    cy.visit('/');
    cy.get('a[routerLink="/test"], a[href="/test"]').first().click();
    cy.url().should('include', '/test');
  });

  it('la barra de navegación del home lleva al login', () => {
    cy.visit('/');
    cy.get('a[routerLink="/login"], a[href="/login"]').first().click();
    cy.url().should('include', '/login');
  });

  it('desde el login se puede navegar al test', () => {
    cy.visit('/login');
    cy.get('a[routerLink="/test"]').click();
    cy.url().should('include', '/test');
  });

  it('desde el resultado del test se puede ir a teléfonos', () => {
    cy.visit('/test');
    cy.contains('Comenzar el test').click();
    for (let i = 0; i < 10; i++) {
      cy.get('.answer-no').click();
    }
    cy.contains('Ver teléfonos de ayuda').click();
    cy.url().should('include', '/telefonos');
  });
});
