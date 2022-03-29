import { BillingAddress } from './address-interface'

export const updateAddressData = (id: number): BillingAddress => ({
  line1: 'Tallinas iela',
  line2: '',
  city: 'Tallinn',
  zip: '59959',
  state: 'Tallinn',
  country: 'Estonia',
  firstName: 'Simpson',
  lastName: 'Marge',
  company: 'Homer & Marge',
  phone: '04944494',
  entityType: 'billing',
  customerId: id,
})

export const billingAddress = (customerId: number, billingId: number, factoryId: number) => ({
  line1: 'Tallinas iela',
  line2: '',
  city: 'Tallinn',
  zip: '59959',
  state: 'Tallinn',
  country: 'Estonia',
  firstName: 'Simpson',
  lastName: 'Marge',
  company: 'Homer & Marge',
  phone: '04944494',
  entityType: 'billing',
  id: billingId,
  customerId: customerId,
  createdAt: '2022-03-28T15:18:01.402Z',
  updatedAt: '2022-03-28T15:18:01.402Z',
  factoryId: factoryId,
})

export const createCustomerMainAddress = (customerId: number, billingId: number, factoryId: number, name: string) => ({
  addresses: [billingAddress(customerId, billingId, factoryId)],
  firstName: 'Marge',
  name,
  id: customerId,
  defaultBillingId: billingId,
})
