import LoginPage from '../../../support/auth/auth-page'
import HeaderTabsPage from '../../../support/header/header-tabs-page'
import { CustomersElements } from '../../../support/header/header-elements'
import { fullBaseCustomerData } from '../../../fixtures/customer/customer-data'
import CustomerPage from '../../../support/customer/customer-page'
import { GetBy, Support } from '../../../support/helper'
import {
  AddressElements,
  BillingRightElements,
} from '../../../support/customer/billing-elements'
import { Path } from '../../../support/path'

const { Customer } = CustomersElements
const { FirstAddress } = BillingRightElements
const { AddressInfo, PhoneInfo, ContactInfo } = AddressElements

const expectValues = {
  line1: 'West 1st Avenue',
  line2: '',
  city: 'Nome',
  state: 'Alaska',
  zip: '99762',
  country: 'United States',
}

describe('short billing address', () => {
  let createdId: string
  const { line1, country, zip, city, state } = expectValues
  const { phone, firstName, lastName } =
    fullBaseCustomerData().billingLeftAddress

  before(() => {
    LoginPage.login()
    cy.visit('/')
    HeaderTabsPage.selectCustomer(Customer)

    CustomerPage.fillNewCustomer(fullBaseCustomerData())

    cy.url().then((el) => (createdId = el.split('/').pop()))

    GetBy.nameAttr(FirstAddress).should('contain.value', line1)
    CustomerPage.saveAddress()

    GetBy.className('saved').should('contain.text', 'All changes saved')
  })

  after(() => {
    cy.delete(`${Path.customers}/${createdId}`)
  })

  it('all Address data should be the same', () => {
    CustomerPage.selectSavedAddress()

    Support.containsEqualValues(BillingRightElements, expectValues)
    CustomerPage.closeAddressForm()
  })

  it('should contain address info', () => {
    const expectAddress = `${line1}, ${city}, ${state}, ${zip}, ${country}`

    GetBy.dataCy(AddressInfo).should('contain.text', expectAddress)
  })

  it('should contain phone info', () => {
    GetBy.dataCy(PhoneInfo).should('contain.text', phone)
  })

  it('should contain contact info', () => {
    GetBy.dataCy(ContactInfo).should('contain.text', `${firstName} ${lastName}`)
  })
})
