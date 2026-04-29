describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('muestra el panel izquierdo con garantías de privacidad', () => {
    cy.contains('Tu espacio seguro.').should('be.visible');
    cy.contains('Anonimato técnico').should('be.visible');
    cy.contains('Cifrado E2E').should('be.visible');
    cy.contains('Protección legal').should('be.visible');
  });

  it('muestra el tab de alumno activo por defecto', () => {
    cy.contains('Soy Alumno/a').should('have.class', 'active');
    cy.contains('Acceso anónimo').should('be.visible');
  });

  it('el formulario de alumno tiene campo de correo y contraseña', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('el enlace "Haz el test primero" navega a /test', () => {
    cy.contains('Haz el test primero →').click();
    cy.url().should('include', '/test');
  });

  it('cambiar al tab docente muestra el formulario del docente', () => {
    cy.contains('Soy Docente').click();
    cy.contains('Panel Docente').should('be.visible');
    cy.get('input[type="text"]#usuario').should('be.visible');
  });

  it('el tab docente tiene los campos de usuario y contraseña', () => {
    cy.contains('Soy Docente').click();
    cy.get('#usuario').should('be.visible');
    cy.get('#doc-password').should('be.visible');
    cy.contains('Acceder al panel').should('be.visible');
  });

  it('se puede escribir en el formulario de alumno', () => {
    cy.get('input[type="email"]').type('alumno@escuela.edu.es');
    cy.get('input[type="password"]').type('contraseña123');
    cy.get('input[type="email"]').should('have.value', 'alumno@escuela.edu.es');
    cy.get('input[type="password"]').should('have.value', 'contraseña123');
  });

  it('se puede escribir en el formulario de docente', () => {
    cy.contains('Soy Docente').click();
    cy.get('#usuario').type('prof.garcia');
    cy.get('#doc-password').type('clavecentro');
    cy.get('#usuario').should('have.value', 'prof.garcia');
  });

  it('volver al tab alumno muestra de nuevo el formulario de alumno', () => {
    cy.contains('Soy Docente').click();
    cy.contains('Soy Alumno/a').click();
    cy.contains('Acceso anónimo').should('be.visible');
  });
});
