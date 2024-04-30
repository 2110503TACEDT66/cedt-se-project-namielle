describe('review', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin')
        cy.wait(3000)
        cy.get('input#email').type('admin@email.com')
        cy.get('input#password').type('123456')
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
    })

    it('visit hotel', () => {
        cy.visit('http://localhost:3000/')
        cy.wait(11000)
        cy.get('div.flex > .mx-5').as('btn').click()
        cy.get('@btn').click()
    })

    it('review hotel', () => {
        cy.visit('http://localhost:3000/hotel/')
        cy.wait(15000)
        cy.get(':nth-child(1) > .m-1 > #search').type('0A')
        cy.wait(3000)
        cy.get('a[id="0A Hotel"]').click({force: true})
        cy.get('button#66216dd0da7f3adfe936d2f3').should('exist')
        cy.get('button#66216dd0da7f3adfe936d2f3').click({force: true})
        cy.wait(3000)
        cy.get('button#66216dd0da7f3adfe936d2f3').click({force: true})
        cy.wait(1000)
    })
})