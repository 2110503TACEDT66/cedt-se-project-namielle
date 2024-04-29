describe('discount', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signin')
        cy.wait(3000)
        cy.get('input#email').type('admin@email.com')
        cy.get('input#password').type('123456')
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
    })

    it('click discount', () => {
        cy.visit('http://localhost:3000/')
        cy.wait(2000)
        cy.get('div.flex > .mx-5').click({force: true})
        cy.get('.my-2 > :nth-child(2)').click({force: true})
        cy.wait(1000)
    })

    it('add discount', () => {
        cy.visit('http://localhost:3000/editdiscount')
        cy.wait(2000)
        cy.get('input#name').type('Test 50% discount')
        cy.get('input#info').type('test create 50% discount')
        cy.get('input#code').type('fiftysniffyriggywicking')
        cy.get('input#percentage').type(50)
        cy.get('input#image').type('https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
        cy.get('.bg-orange-500').click({force: true})
        cy.wait(1000)
        cy.get('.swal2-confirm').click({force: true})
        cy.wait(1000)
    })

    it('remove discount', () => {
        cy.visit('http://localhost:3000/discount')
        cy.wait(2000)
        cy.get('#fiftysniffyriggywicking').click({force: true})
        cy.wait(1000)
        cy.get('.swal2-confirm').click({force: true})
        cy.wait(1000)
        cy.get('.swal2-confirm').click({force: true})
        cy.wait(4000)
    })
})