import { fullCustomerForm } from './address-interface'

export const fullBaseCustomerData = (): fullCustomerForm => ({
  customer: {
    firstName: 'Homer',
    lastName: 'Simpson',
    company: 'Homer-Truck',
    DisplayName: 'Homer Simpson',
    email: `${Cypress.env('email')}`,
    phone: '6135633961',
    comment: 'Stupid Flanders.',
  },
  billingLeftAddress: {
    firstName: 'Marge',
    lastName: 'Simpson',
    company: 'company',
    phone: '059959395',
  },
  billingRightAddress: {
    firstName: 'firstName',
    lastName: 'lastName',
    company: 'company',
    phone: '6135631236',
    firstAddress: 'West 1st Avenue',
    secondAddress: 'line2',
    city: 'city',
    state: 'state',
    zip: 'zip',
    country: 'country',
  },
})
