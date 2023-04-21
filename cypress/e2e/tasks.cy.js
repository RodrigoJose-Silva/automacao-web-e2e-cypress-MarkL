///<reference types="cypress" />

describe('tasks', () => {

    let testData;

    before(()=>{
        cy.fixture('task').then(t =>{
            testData= t
        })
    })

    context('register', () => {
        it('Should be register a new task', () => {

            const taskName = 'Task automated - Ler um livro de node.js'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)

            cy.contains('main div p', taskName)
                .should('be.visible')
        })

        it('Should not allow dulpicated task', () => {

            const task = testData.dup

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

    context('update', ()=>{
        it('Should be task finish', ()=>{
            const task = {
                name: 'Task automated - Pagar conta de consumo',
                is_done: false
            }
                
            cy.removeTaskByName(task.name)
            cy.createNewTaskByAPI(task)
            
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    
    context('delete', ()=>{
        it('Should remove task', ()=>{
            const task = {
                name: 'Task automated - Estudar Java',
                is_done: false
            }
                
            cy.removeTaskByName(task.name)
            cy.createNewTaskByAPI(task)
            
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
                .should('not.exist')
        })
    })
})