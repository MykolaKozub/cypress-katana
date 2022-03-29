import LoginPage from '../../../support/auth/auth-page'
import HeaderTabsPage from '../../../support/header/header-tabs-page'
import { CustomersElements } from '../../../support/header/header-elements'
import { GetBy } from '../../../support/helper'
import { FlakyLocators } from '../../../support/flaky-locators'
import SalesOrderPage from '../../../support/salesorder/sales-order-page'
import { SalesOrderElements } from '../../../support/salesorder/sales-order-elements'
import { updateAddressData } from '../../../fixtures/customer/customer-address'
import { createCustomer } from '../../../support/customer/services'
import { Path } from '../../../support/path'

const { Sales } = CustomersElements
const { classLoader } = FlakyLocators
const { Location, Phone, Address } = SalesOrderElements

describe('add address to new customer', () => {
  let customerId: number
  const { firstName, lastName, company, line1, zip, state, city, phone } = updateAddressData(1)
  const name = `test: ${new Date().getMilliseconds()}`

  before(() => {
    LoginPage.login()
    cy.visit('/')
    createCustomer(name).then(({ id }) => (customerId = id))
  })

  after(() => {
    cy.delete(`${Path.customers}/${customerId}`)
  })

  it('check that short address equal customer address', () => {
    HeaderTabsPage.selectCustomer(Sales)

    GetBy.className(classLoader).should('be.visible')
    GetBy.className(classLoader).should('not.exist')

    SalesOrderPage.typeAndSelectProduct(name)

    GetBy.dataCy(Address).should('contain.text', `${firstName} ${lastName}, ${company}`)
    GetBy.dataCy(Location).should('contain.text', `${line1}, ${city}, ${state}, ${zip}`)
    GetBy.dataCy(Phone).should('contain.text', phone)
  })
})
