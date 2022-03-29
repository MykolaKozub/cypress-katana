import { Path } from '../path'
import { createCustomerMainAddress, updateAddressData } from '../../fixtures/customer/customer-address'

export const createCustomer = (name): Promise<Record<string, any>> => {
  let customerId, factoryId: number
  const defaultBody = { addresses: [], firstName: '', name }

  return cy
    .post(Path.customers, defaultBody)
    .then(({ body }) => {
      customerId = body.id
      factoryId = body.factoryId

      return cy.post(Path.updateAddress, updateAddressData(customerId))
    })
    .then(({ body }) => {
      return cy.patch(
        `${Path.customers}/${customerId}`,
        createCustomerMainAddress(customerId, body.id, factoryId, name)
      )
    })
    .then(({ body }) => {
      return body
    })
}
