export interface CustomerData {
  firstName: string
  lastName: string
  company: string
  DisplayName: string
  email: string
  phone: string
  comment: string
}

export interface Address {
  firstName: string
  lastName: string
  company: string
  phone: string
}

export interface AddressInterface extends Address {
  firstAddress: string
  secondAddress: string
  city: string
  state: string
  zip: string
  country: string
}

export interface fullCustomerForm {
  customer: CustomerData
  billingLeftAddress: Address
  billingRightAddress: AddressInterface
}

export interface BillingAddress {
  line1: string
  line2: string
  city: string
  zip: string
  state: string
  country: string
  firstName: string
  lastName: string
  company: string
  phone: string
  entityType: string
  customerId: number
}
