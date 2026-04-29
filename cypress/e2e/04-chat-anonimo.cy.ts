describe('Chat Anónimo', () => {
  beforeEach(() => {
    cy.visit('/chat');
  });

  it('muestra la pantalla de selección de docente', () => {
    cy.contains('Elige a tu persona de confianza').should('be.visible');
    cy.get('.teacher-card').should('have.length.greaterThan', 0);
  });

  it('muestra el código anónimo del usuario en el header', () => {
    cy.get('.chat-header').should('be.visible');
    cy.contains('Usuario-').should('be.visible');
  });

  it('las tarjetas de docente muestran nombre, rol y disponibilidad', () => {
    cy.get('.teacher-card').first().within(() => {
      cy.get('.teacher-name').should('be.visible');
      cy.get('.teacher-role').should('be.visible');
      cy.get('.teacher-status').should('be.visible');
    });
  });

  it('seleccionar un docente disponible abre la ventana de chat', () => {
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.get('.chat-window').should('be.visible');
    cy.get('.messages-area').should('be.visible');
  });

  it('el chat muestra el nombre del docente seleccionado', () => {
    cy.get('.teacher-card').not('.unavailable').first().within(() => {
      cy.get('.teacher-name').invoke('text').as('teacherName');
    });
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.get('@teacherName').then((name) => {
      cy.get('.chat-name').should('contain', name);
    });
  });

  it('se puede escribir un mensaje en el input', () => {
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.get('.msg-input').type('Hola, necesito ayuda');
    cy.get('.msg-input').should('have.value', 'Hola, necesito ayuda');
  });

  it('enviar un mensaje lo muestra en el área de mensajes', () => {
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.get('.msg-input').type('Hola, necesito ayuda');
    cy.get('.send-btn').click();
    cy.get('.messages-area').contains('Hola, necesito ayuda').should('be.visible');
    cy.get('.msg-input').should('have.value', '');
  });

  it('se puede enviar un mensaje pulsando Enter', () => {
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.get('.msg-input').type('Mensaje via Enter{enter}');
    cy.get('.messages-area').contains('Mensaje via Enter').should('be.visible');
  });

  it('el botón de enviar está deshabilitado con el input vacío', () => {
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.get('.send-btn').should('be.disabled');
  });

  it('"Cambiar interlocutor" vuelve a la selección de docente', () => {
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.get('.back-btn').click();
    cy.contains('Elige a tu persona de confianza').should('be.visible');
  });

  it('muestra el aviso legal de anonimato en el chat', () => {
    cy.get('.teacher-card').not('.unavailable').first().click();
    cy.contains('Este chat es anónimo').should('be.visible');
  });

  it('muestra el recordatorio de seguridad en la selección', () => {
    cy.contains('Recordatorio de seguridad').should('be.visible');
  });
});
