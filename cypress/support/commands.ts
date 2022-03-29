// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void

    getRequest<T extends Record<string, any>>(url: string, timeout?: number): Promise<T>

    post<T extends Record<string, any>>(name: string, body: Record<string, any>, timeout?: number): Promise<T>

    delete<T extends Record<string, any>>(name: string): Promise<T>

    patch<T extends Record<string, any>>(name: string, body: any): Promise<T>

    clickAndWaitRequest(path: string, doSomething?: () => void): Cypress.Chainable<any>

    clickAndWaitResponse(path: string, doSomething?: () => void): Cypress.Chainable<any>
  }
}

Cypress.Commands.add('post', (url: string, body: any) => {
  return cy.request({
    url,
    method: 'POST',
    body,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cypress.env('token')}`,
    },
  })
})

Cypress.Commands.add('delete', (url: string) => {
  return cy.request({
    url,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cypress.env('token')}`,
    },
  })
})

Cypress.Commands.add('patch', (url: string, body: any) => {
  return cy.request({
    url,
    method: 'PATCH',
    body,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${Cypress.env('token')}`,
    },
  })
})

Cypress.Commands.add('clickAndWaitRequest', (path: string, doSomething?: () => void) => {
  cy.intercept(path).as('alias')
  doSomething()
  return cy.wait('@alias').then(res => res.request.body)
})

Cypress.Commands.add('clickAndWaitResponse', (path: string, doSomething?: () => void) => {
  cy.intercept(path).as('alias')
  doSomething()
  return cy.wait('@alias').then(res => res.response.body)
})
