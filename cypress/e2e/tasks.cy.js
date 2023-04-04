///<reference types="cypress" />

describe('tasks', () => {
    it('Should be register a new task', () => {
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: 'Ler um livro de node.js' }
        }).then(response => {
            expect(response.status).to.eql(204)
        })

        cy.visit('http://localhost:3000/')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Ler um livro de node.js')

        cy.contains('button', 'Create').click()

        cy.contains('main div p', 'Ler um livro de node.js')
            .should('be.visible')
    })
})