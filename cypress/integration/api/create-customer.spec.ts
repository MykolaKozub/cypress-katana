import { CustomersElements } from '../../support/header/header-elements'
import HeaderTabsPage from '../../support/header/header-tabs-page'
import LoginPage from '../../support/auth/auth-page'
import { GetBy } from '../../support/helper'
import { CustomerFormElements } from '../../support/customer/customer-elements'
import { Path } from '../../support/path'
import * as dayjs from 'dayjs'

const { Customer } = CustomersElements

describe('check request/response when create new Customer', () => {
  let createdId: number
  const firstName = 'test user'

  before(() => {
    LoginPage.login()
    cy.visit('/')
  })

  beforeEach(() => {
    HeaderTabsPage.selectCustomer(Customer)
  })

  after(() => {
    cy.delete(`${Path.customers}/${createdId}`)
  })

  it('should contain right request data', () => {
    const expectRequestBody = name => ({ addresses: [], firstName: name, name })

    GetBy.nameAttr(CustomerFormElements.FirstName).type(firstName)
    cy.clickAndWaitRequest('**/api/customers', () => cy.get('div').contains('Not saved').click()).then(body => {
      expect(body).deep.eq(expectRequestBody(firstName))
    })
  })

  // TODO more clear way use API tests and check response there use http request libraries and jest or what you love
  it('should contain right response data', () => {
    const expectResponseData = name => ({
      createdAt: dayjs().format('YYYY-MM-DD'),
      currency: 'USD',
      factoryId: '39201',
      firstName: name,
      id: '25094314',
      name: name,
      updatedAt: dayjs().format('YYYY-MM-DD'),
    })

    GetBy.nameAttr(CustomerFormElements.FirstName).type(firstName)
    cy.clickAndWaitResponse('**/api/customers', () => cy.get('div').contains('Not saved').click()).then(body => {
      createdId = body.id

      const { comment, company, defaultBillingId, defaultShippingId, deletedAt, email, lastName, phone } = body
      const nullableValues = [comment, company, defaultBillingId, defaultShippingId, deletedAt, email, lastName, phone]

      expect(body.addresses).to.be.empty
      expect(body.updatedAt).contains(expectResponseData(firstName).updatedAt)
      expect(body.createdAt).contains(expectResponseData(firstName).createdAt)
      expect(`${body.factoryId}`.length).eq(expectResponseData(firstName).factoryId.length)
      expect(`${body.id}`.length).eq(expectResponseData(firstName).id.length)
      expect(body.currency).eq(expectResponseData(firstName).currency)
      nullableValues.forEach(el => expect(el).eq(null))
    })
  })
})
