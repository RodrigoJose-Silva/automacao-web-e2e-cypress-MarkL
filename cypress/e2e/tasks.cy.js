///<reference types="cypress" />

describe('tasks', () => {
    context('register', () => {
        it('Should be register a new task', () => {

            const taskName = 'Ler um livro de node.js'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)

            cy.contains('main div p', taskName)
                .should('be.visible')
        })

        it('Should not allow dulpicated task', () => {

            const task = {
                name: 'Task automated - Ler um livro de JavaScript',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.createNewTaskByAPI(task)
            cy.createTask(task.name)

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })

        it('Should be displayed filds required', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
})