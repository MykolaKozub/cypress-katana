import { GetBy, Support } from '../helper'
import { BillsAddress, CustomerFormElements } from './customer-elements'
import { Address, AddressInterface, CustomerData, fullCustomerForm } from '../../fixtures/customer/address-interface'
import { AddressElements, BillingBtnElements, BillingRightElements, BillingsLeftElements } from './billing-elements'

const { CancelButton, SubmitButton } = BillingBtnElements

class CustomerPage {
  fillAndSaveForm(formElements: Partial<Record<string, string>>, typeValues: Object, serialNumber = 0): void {
    const values = Object.values(typeValues)

    Object.values(formElements).forEach((el, idx) => {
      if (el === 'name' && !serialNumber) {
        return
      }

      Support.typeAndWaitSawing(el, values[idx], serialNumber)
    })
  }

  fillForm(formElements: Partial<Record<string, string>>, typeValues: Object, serialNumber = 0): void {
    const values = Object.values(typeValues)

    Object.values(formElements).forEach((el, idx) => {
      GetBy.nameAttr(el).eq(serialNumber).type(values[idx])
    })
  }

  fillMainForm(customerObj: CustomerData, CustomerElements = CustomerFormElements, serialNumber = 0): this {
    this.fillAndSaveForm(CustomerElements, customerObj, serialNumber)
    return this
  }

  fillLeftBillingAddress(addressObj: Address, addressElements = BillingsLeftElements, serialNumber = 1): this {
    this.fillForm(addressElements, addressObj, serialNumber)
    return this
  }

  fillRightAddressForm(addressObj: AddressInterface, addressElements = BillingRightElements, serialNumber = 0): this {
    this.fillForm(addressElements, addressObj, serialNumber)

    return this
  }

  selectCostumerAddress(name: string, addressNumber = 0): this {
    GetBy.spanContains(name).eq(addressNumber).realClick()

    return this
  }

  selectAddress(name: BillsAddress): this {
    GetBy.nameAttr(name).click()
    return this
  }

  selectSavedAddress() {
    GetBy.dataCy(AddressElements.DefaultBillAddress).click()
  }

  saveAddress(): this {
    GetBy.id(SubmitButton).click()
    return this
  }

  closeAddressForm(): this {
    GetBy.id(CancelButton).click()
    return this
  }

  fillNewCustomer(fullCustomerForm: fullCustomerForm): this {
    const { customer, billingRightAddress, billingLeftAddress } = fullCustomerForm

    this.fillMainForm(customer)
      .selectAddress(BillsAddress.DefaultBillingAddress)
      .fillLeftBillingAddress(billingLeftAddress)
      .fillRightAddressForm(billingRightAddress)
      .selectCostumerAddress(billingRightAddress.firstAddress)

    return this
  }
}

export default new CustomerPage()
