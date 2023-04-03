///<reference types="cypress" />

describe('tasks', () => {
    it('Should be register a new task', () => {
        cy.visit('http://localhost:3000/')

        cy.get('input[placeholder="Add a new Task"]')
            .type('Ler um livro de node.js')
    })
})