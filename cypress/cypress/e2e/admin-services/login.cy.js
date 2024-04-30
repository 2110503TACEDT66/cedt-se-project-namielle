describe('logging in', () => {
  let token;
    
  it('login with email and password', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/v1/auth/login',
        body: {
          email: 'admin@email.com',
          password: '123456'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        token = response.body.token;
        Cypress.env('token', token);
      });
  });
  
  it('visit website', () => {
    cy.visit('http://localhost:3000')
  })

  it('click signin', () => {
    cy.visit('http://localhost:3000/signin')
    cy.wait(2000)
    cy.get('input#email').type('admin@email.com')
    cy.get('input#password').type('123456')
    cy.get('button[type=submit]').click({force: true})
    cy.wait(2000)
  })
})