describe.only('Log in feature', () => {
    it.only('should log in successfully', () => {
      const username = 'jujuba100';
      const password = '123';
  
      cy.visit('https://www.demoblaze.com/index.html');
  
      cy.get('#login2').click();
  cy.wait(3000)
      cy.get('#loginusername').type(username);
      cy.get('#loginpassword').type(password);
      cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
      //cy.get('.btn.btn-primary').click({ multiple: true });
     // cy.contains('Log in').click();
      cy.wait(3000)
      // Verifica se o usuário está logado
      cy.contains('Welcome jujuba100').should('be.visible');
     
    });
  });
  