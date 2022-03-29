import LoginPage from '../../../support/auth/auth-page'
import HeaderTabsPage from '../../../support/header/header-tabs-page'
import { CustomersElements } from '../../../support/header/header-elements'
import CustomerPage from '../../../support/customer/customer-page'
import { fullBaseCustomerData } from '../../../fixtures/customer/customer-data'
import { GetBy, Support } from '../../../support/helper'
import { CustomerFormElements } from '../../../support/customer/customer-elements'
import { Path } from '../../../support/path'

const { Customer } = CustomersElements
const { FirstName } = CustomerFormElements

describe('check saving process', () => {
  let createdId: string

  before(() => {
    LoginPage.login()
    cy.visit('/')

    HeaderTabsPage.selectCustomer(Customer)
    CustomerPage.fillMainForm(fullBaseCustomerData().customer)

    cy.url().then(el => (createdId = el.split('/').pop()))
  })

  after(() => {
    cy.delete(`${Path.customers}/${createdId}`)
  })

  it('should save all filled data', () => {
    const { firstName } = fullBaseCustomerData().customer
    cy.visit(`${Path.customer}/${createdId}`)

    GetBy.nameAttr(FirstName).should('contain.value', firstName)

    Support.containsEqualValues(CustomerFormElements, fullBaseCustomerData().customer)
  })
})
