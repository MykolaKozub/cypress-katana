import LoginPage from '../../../support/auth/auth-page'
import HeaderTabsPage from '../../../support/header/header-tabs-page'
import { CustomersElements } from '../../../support/header/header-elements'
import { fullBaseCustomerData } from '../../../fixtures/customer/customer-data'
import CustomerPage from '../../../support/customer/customer-page'
import { GetBy } from '../../../support/helper'
import { BillsAddress } from '../../../support/customer/customer-elements'

const { billingLeftAddress, billingRightAddress } = fullBaseCustomerData()
const { DefaultShippingAddress } = BillsAddress
const { Customer } = CustomersElements

describe('add other address and check required fields', () => {
  before(() => {
    LoginPage.login()
    cy.visit('/')
  })

  beforeEach(() => {
    HeaderTabsPage.selectCustomer(Customer)

    GetBy.spanContains('Add address').should('not.exist')

    CustomerPage.fillNewCustomer(fullBaseCustomerData()).saveAddress()

    GetBy.className('saved').should('contain.text', 'All changes saved')
  })

  it('should add other shipping addresses', () => {
    GetBy.spanContains('Add address').click()
    CustomerPage.fillLeftBillingAddress(billingLeftAddress)
      .fillRightAddressForm(billingRightAddress)
      .selectCostumerAddress(billingRightAddress.firstAddress)
      .saveAddress()

    GetBy.spanContains('Use billing address').click()
    GetBy.nameAttr(DefaultShippingAddress).invoke('attr', 'placeholder').should('contain', 'Same as billing address')
  })
})
