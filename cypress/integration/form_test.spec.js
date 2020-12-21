
describe('Form', () => {
    it('When visiting the home page, the form is visible', () => {
        cy.visit('http://localhost:9000')
        cy.get('[data-hook=mainForm]').should('be.visible')

    })

    it('when typing a value into origin city autocomplete, this autocomplete is visible and has typed values', () => {
        cy.get('[data-hook=autocompleteOrigin]').as('autocompleteOrigin')
        
        cy.get('@autocompleteOrigin').should('be.visible')
        cy.get('@autocompleteOrigin').type('Харьков')
        cy.get('@autocompleteOrigin').should('have.value', 'Харьков')

    })
    it('when typing a value into Destination city autocomplete, this autocomplete is visible and has typed values', () => {
        cy.get('[data-hook=autocompleteDestination]').as('autocompleteDestination')
        
        cy.get('@autocompleteDestination').should('be.visible')
        cy.get('@autocompleteDestination').type('Киев')
        cy.get('@autocompleteDestination').should('have.value', 'Киев')

    })

    it('when clicking on the depart datepicker the datpicker modal should opens', () => {
        cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-container' ).as('modalWindow')

        cy.get('@datepickerDepartInput').click()
        cy.get('@modalWindow').should('be.visible')
        
    })

    it('after selecting the departing date, it should be displayed in the field int right format',() => {
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-container .is-today' ).as('today')
        cy.get('[data-hook=datepickerDepartWrap] .datepicker-container .btn-flat' ).as('modalButtons')
        cy.get('[data-hook=datepickerDepartInput]').as('datepickerDepartInput')

        cy.get('@today').click()
        cy.get('@today').should('have.class', 'is-selected')
        cy.get('@modalButtons').contains('Ok').click()
    
        cy.get('@datepickerDepartInput').then(($input) => {
            const val = $input.val()
            // 2020-11
            expect(val).to.match(/^\d{4}-\d{2}$/)
        })
    })

    it('when selecting the currency from the header dropdown it should be changed and visible in the head',() => {
        cy.get('[data-hook=currencySelect] .dropdown-trigger').as('currencyTrigger')
        cy.get('[data-hook=currencySelect] .dropdown-content li').as('currencyItem')

        cy.get('@currencyTrigger').click()
        cy.get('@currencyItem').contains('€ Euro').click()
        cy.get('@currencyTrigger').should('have.value', '€ Euro')



    } )
})

