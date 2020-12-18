describe('Form', () => {
    it('When visiting the home page, the form is visible', () => {
        cy.visit('http://localhost:9000')
        cy.get('[data-hook=mainForm]').should('be.visible')

    })

    it('when typing a value into autocomplete, this autocomplete is visible and has typed values', () => {
        cy.get('[data-hook=autocompleteOrigin]').should('be.visible')
        cy.get('[data-hook=autocompleteOrigin]').type('Харьков')
        cy.get('[data-hook=autocompleteOrigin]').should('have.value', 'Харьков')

    })
})