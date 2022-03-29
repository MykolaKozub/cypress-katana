import { mainUser, User } from './users-data'
import { LoginElements } from './login-elements'
import { GetBy } from '../helper'

const { Email, Submit, Password } = LoginElements

class LoginPage {
  login(user: User = mainUser, useTheSameUser = true): void {
    const { login, password } = user
    Cypress.env('email', login)

    if (Cypress.env('katana_auth') && useTheSameUser) {
      localStorage.setItem('katana_auth', Cypress.env('katana_auth'))
      return
    }
    cy.visit('/')
    GetBy.nameAttr(Email).type(login)
    GetBy.nameAttr(Password).type(password)
    GetBy.nameAttr(Submit).click()

    cy.url()
      .should(() => {
        expect(localStorage.getItem('katana_auth')).not.empty
      })
      .then(_ => {
        Cypress.env('token', JSON.parse(localStorage.getItem('katana_auth')).token)
        Cypress.env('katana_auth', localStorage.getItem('katana_auth'))
      })
  }
}

export default new LoginPage()
