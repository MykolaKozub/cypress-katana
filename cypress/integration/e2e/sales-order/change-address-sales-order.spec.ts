import LoginPage from '../../../support/auth/auth-page'
import HeaderTabsPage from '../../../support/header/header-tabs-page'
import { CustomersElements } from '../../../support/header/header-elements'
import { GetBy } from '../../../support/helper'
import { FlakyLocators } from '../../../support/flaky-locators'
import SalesOrderPage from '../../../support/salesorder/sales-order-page'
import { SalesOrderElements } from '../../../support/salesorder/sales-order-elements'
import { createCustomer } from '../../../support/customer/services'
import { Path } from '../../../support/path'
import { fullBaseCustomerData } from '../../../fixtures/customer/customer-data'
import CustomerPage from '../../../support/customer/customer-page'
import { BillingsLeftElements } from '../../../support/customer/billing-elements'

const { Sales } = CustomersElements
const { classLoader } = FlakyLocators
const { Location, Phone, Address } = SalesOrderElements

const { billingLeftAddress, billingRightAddress } = fullBaseCustomerData()

describe('update address to sales order', () => {
  let customerId: number
  const name = `test: ${new Date().getMilliseconds()}`

  before(() => {
    LoginPage.login()
    cy.visit('/')
    createCustomer(name).then(({ id }) => (customerId = id))

    HeaderTabsPage.selectCustomer(Sales)

    GetBy.className(classLoader).should('be.visible')
    GetBy.className(classLoader).should('not.exist')

    SalesOrderPage.typeAndSelectProduct(name)

    GetBy.dataCy(Address).click()
    CustomerPage.fillLeftBillingAddress(billingLeftAddress, BillingsLeftElements, 0)
      .fillRightAddressForm(billingRightAddress)
      .saveAddress()
  })

  after(() => {
    cy.delete(`${Path.customers}/${customerId}`)
  })

  it('should contain new address info', () => {
    const { firstName, lastName, company, phone, firstAddress, secondAddress } = billingRightAddress
    const expectAddress = `${firstName}, ${lastName}, ${company}, ${phone}, ${firstAddress}, ${secondAddress}`

    GetBy.dataCy(Location).should('contain.text', expectAddress)
  })

  it('should contain new phone info', () => {
    const { phone } = billingLeftAddress

    GetBy.dataCy(Phone).should('contain.text', phone)
  })

  it('should contain new contact info', () => {
    const { firstName, lastName, company } = billingLeftAddress

    GetBy.dataCy(Address).should('contain.text', `${firstName} ${lastName}, ${company}`)
  })
})
