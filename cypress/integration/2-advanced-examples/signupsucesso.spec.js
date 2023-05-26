import faker from 'faker';
describe.only('Cadastro de Usuário', () => {
    it.only('Realizar cadastro válido', () => {
      const signUp = () => {
        const username = faker.internet.userName();
        cy.visit('https://www.demoblaze.com/index.html');
        cy.get('#signin2').click();
        cy.wait(2000)
        cy.get('#sign-username').should('be.visible').type(username);
        cy.get('#sign-password').type('mypassword');
        cy.wait(3000);
        cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
        
        cy.log('Cheguei até aqui depois do clique signup');
 
        cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupRequest');
        const handleSignUpResponse = (res) => {
        expect(res.body.alertMessage).to.equal('Sign up successful.');}
      //  cy.wait('@signupRequest').then((interception) => {
         // const { response } = interception;
         // handleSignUpResponse(response);
       // });
      };
 
      const handleSignUpResponse = (res) => {
        if (res.body.errorMessage === 'This user already exist.') {
          cy.log('Cheguei até aqui - Usuário já existe');
          signUp();
        } else if (res.body.alertMessage === 'Please fill out Username and Password.') {
          cy.log('Cheguei até aqui - Campos de usuário e senha não preenchidos');
          signUp();
        } else {
          expect(res.body.alertMessage).to.equal('Sign up successful.');
          cy.log('Cheguei no final - Cadastro bem-sucedido');
        }
      };
 
      signUp();
 
      // Retorna uma promessa que representa a conclusão do teste
    });
  });

  describe('Cadastro de Usuário repetido', () => {
    it('Realizar cadastro válido', () => {
      const username = 'juliana';
      const password = '123';
      cy.wait(3000)
      cy.visit('https://www.demoblaze.com/index.html');
      cy.wait(3000)
      cy.get('#signin2').click();
      cy.get('#sign-username').should('be.visible').type(username);
      cy.get('#sign-password').type(password);
      cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
      cy.log('Cheguei até aqui depois do clique signup');
  
      //interceptar a rota
      cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupRequest');
      cy.wait(3000)
      cy.wait('@signupRequest').then((interception) => {
        const { response } = interception;
        handleSignUpResponse(response);
      });
      
      const handleSignUpResponse = (res) => {
        if (res.body.errorMessage === 'This user already exist.') {
          cy.log('FIM TESTE');
        } else {
            //expect(res.body.alertMessage).to.equal('Sign up successful.');
            cy.log('NÃO CHEGUEI ATE O FIM');
          }
    };
    });
  });
