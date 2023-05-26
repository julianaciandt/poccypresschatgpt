describe.only('Teste de Login e Adição de Produto ao Carrinho', () => {
    it.only('Realiza login e adiciona o Samsung galaxy s6 ao carrinho', () => {
      // Visitando a URL
      cy.visit('https://www.demoblaze.com/index.html');
      cy.wait(3000);
      // Clicar em Log in
      cy.get('#login2').click();
      cy.wait(3000);
      // Preencher campos de login
      cy.get('#loginusername').type('jujuba100');
      cy.get('#loginpassword').type('123');
  
      // Clicar em Log in
      //cy.get('.btn.btn-primary').click();
      cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
      // Aguardar 3 segundos
      cy.wait(3000);
  
      // Clicar no celular Samsung galaxy s6
      cy.contains('Samsung galaxy s6').click();
  
      // Aguardar 3 segundos
      cy.wait(3000);
  
      // Clicar no botão "Add to cart"
      cy.get('.btn.btn-success.btn-lg').click();
  
      // Validar o alerta com a mensagem "Product added"
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Product added.');
      });
    });
  });
  