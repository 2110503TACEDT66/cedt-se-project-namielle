describe('createHotel', () => {
    

    beforeEach('log in', () => {
        cy.visit('http://localhost:3000/signin')
        cy.wait(3000)
        cy.get('input#email').type('admin@email.com')
        cy.get('input#password').type('123456')
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
    })

    it('createHotel page', () => {
        cy.visit('http://localhost:3000/');
        cy.wait(2000);
        cy.get('div.flex > .mx-5').click({force: true});
        cy.get('.my-2 > :nth-child(3)').click({force: true});
    });

    it('add hotel', () => {
        cy.visit('http://localhost:3000/hotel/addnewhotel')
        cy.wait(2000)
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('input#name').type('00 Testing Hotel')
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('input#address').type('test create hotel')
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('input#telephone').type('199-456-7890')
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('input#telephone').clear()
        cy.get('input#telephone').type('099-456-7890')
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('input#capacity').type(1)
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('input#city').type('test city')
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('input#file').type('https://images.unsplash.com/photo-1543804082-5e00fcfc1e66?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
        cy.get('button').click({force: true})
        cy.wait(1000)
        cy.get('.swal2-confirm').click({force: true})
        cy.wait(1000)
    })

    it('add new Roomtype', () => { 
        cy.visit('http://localhost:3000/hotel/addnewroomtype')
        cy.wait(2000)
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
        cy.get('div.flex > .mx-5').click({force: true})
        cy.get('select#hotel').select('00 Testing Hotel')
        cy.get('input#name').type('Test Room')

        cy.get('input#personLimit').type(0)
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
        cy.get('input#personLimit').type(1)
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)

        cy.get('input#price').type(0)
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
        cy.get('input#price').type(1)
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)

        cy.get('input#roomLimit').type(0)
        cy.get('button[type=submit]').click({force: true})
        cy.wait(1000)
        cy.get('input#roomLimit').type(1)
        cy.get('button[type=submit]').click({force: true})
        
        cy.wait(2000)
        cy.get('.swal2-confirm').click({force: true})

    })

})