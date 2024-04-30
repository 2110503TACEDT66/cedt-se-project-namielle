describe('recommendedHotel', () => {

    beforeEach('log in', () => {
        cy.visit('http://localhost:3000/signin')
        cy.wait(4000)
        cy.get('input#email').type('admin@email.com')
        cy.get('input#password').type('123456')
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
    })

    it('click recommendedHotel page', () => {
        cy.visit('http://localhost:3000/')
        cy.wait(7000)
        cy.get('div.flex > .mx-5').click({force: true})
        cy.get('.my-2 > :nth-child(5)').click({force: true})
        cy.wait(1000)
    })

    it('manual recommendedHotel', () => {
        cy.visit('http://localhost:3000/addrecommended')
        cy.wait(7000)

        cy.get('select[name="Pattaya Hotel"]').select('3').focus().trigger('click')
        cy.get('select[name="Mahasarkham Hotel"]').select('1').focus().trigger('click')
        cy.get('select[name="Chiang Mai Hotel"]').select('2').focus().trigger('click')

        cy.get('.bg-blue-500').click({force: true});
        cy.wait(2000);

        cy.get('.swal2-confirm').click({force: true});
        cy.wait(2000);

        cy.visit('http://localhost:3000/hotel');
        cy.wait(10000)
    })

    it('auto recommendedHotel', () => {
        cy.visit('http://localhost:3000/addrecommended')
        cy.wait(7000)

        cy.get('select[name="Pattaya Hotel"]').select('0').focus().trigger('click')
        cy.get('select[name="Mahasarkham Hotel"]').select('0').focus().trigger('click')
        cy.get('select[name="Chiang Mai Hotel"]').select('0').focus().trigger('click')

        cy.get('.bg-blue-500').click({force: true});
        cy.wait(2000);

        cy.get('.swal2-confirm').click({force: true});
        cy.wait(2000);

        cy.visit('http://localhost:3000/hotel');
    })
})
