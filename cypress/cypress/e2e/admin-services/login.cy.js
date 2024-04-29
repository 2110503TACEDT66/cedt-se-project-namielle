describe('logging in', () => {
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