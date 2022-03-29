import LoginPage from '../../../support/auth/auth-page'
import HeaderTabsPage from '../../../support/header/header-tabs-page'
import { CustomersElements } from '../../../support/header/header-elements'
import { GetBy } from '../../../support/helper'
import { CustomerFormElements } from '../../../support/customer/customer-elements'
import { emails } from '../../../fixtures/validation/emails'

const { Customer } = CustomersElements
const { DisplayName, Email } = CustomerFormElements

describe('check saving process', () => {
  before(() => {
    LoginPage.login()
    cy.visit('/')

    HeaderTabsPage.selectCustomer(Customer)
  })

  it('should be required display name', () => {
    GetBy.nameAttr(DisplayName).type('test').clear()
    GetBy.nameAttr(DisplayName).parent().should('contain.class', 'Mui-error')
  })

  it('should have basic positive email verification', () => {
    emails.positive.forEach(el => {
      GetBy.nameAttr(Email).type(el)
      GetBy.nameAttr(Email).parent().should('not.contain.class', 'Mui-error')
      GetBy.nameAttr(Email).clear()
    })
  })

  it('should have basic negative emails verification', () => {
    emails.negative.forEach(el => {
      GetBy.nameAttr(Email).type(el)
      GetBy.nameAttr(Email).parent().should('contain.class', 'Mui-error')
      GetBy.nameAttr(Email).clear()
    })
  })
})
