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

    it('Should not allow dulpicated task', ()=> {

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: 'Task automated - Ler um livro de JavaScript' }
        }).then(response => {
            expect(response.status).to.eql(204)
        })
        
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: { name: 'Task automated - Ler um livro de JavaScript', is_done: false }
        }).then(response => {
            expect(response.status).to.eql(201)
        })

        cy.visit('http://localhost:3000/')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Task automated - Ler um livro de JavaScript')

        cy.contains('button', 'Create').click()

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })
})