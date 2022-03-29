import LoginPage from '../../../support/auth/auth-page'
import HeaderTabsPage from '../../../support/header/header-tabs-page'
import { CustomersElements } from '../../../support/header/header-elements'
import { fullBaseCustomerData } from '../../../fixtures/customer/customer-data'
import CustomerPage from '../../../support/customer/customer-page'
import { GetBy, Support } from '../../../support/helper'
import { BillingRightElements } from '../../../support/customer/billing-elements'

const { Customer } = CustomersElements
const { FirstAddress } = BillingRightElements

const expectValues = {
  line1: 'West 1st Avenue',
  line2: '',
  city: 'Nome',
  state: 'Alaska',
  zip: '99762',
  country: 'United States',
}

describe('the address form contains all values', () => {
  before(() => {
    LoginPage.login()
    cy.visit('/')
  })

  beforeEach(() => {
    HeaderTabsPage.selectCustomer(Customer)
  })

  it('should right mapping First Address', () => {
    const { line1 } = expectValues

    CustomerPage.fillNewCustomer(fullBaseCustomerData())

    GetBy.nameAttr(FirstAddress).should('contain.value', line1)
    Support.containsEqualValues(BillingRightElements, expectValues)
  })
})
