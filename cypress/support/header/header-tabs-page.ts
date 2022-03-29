import { CustomersElements, HeaderMuiTabsElements } from './header-elements'
import { GetBy } from '../helper'

const { BtnGlobalAdd } = HeaderMuiTabsElements

class HeaderTabsPage {
  selectCustomer(element: CustomersElements): this {
    GetBy.id(BtnGlobalAdd).click()
    GetBy.id(element).click()
    return this
  }
}

export default new HeaderTabsPage()
