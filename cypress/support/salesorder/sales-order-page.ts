import { GetBy } from '../helper'
import { FlakyLocators } from '../flaky-locators'

const { classSalesProductInput, classCircleProgress } = FlakyLocators

class SalesOrderPage {
  typeAndSelectProduct(name: string) {
    GetBy.className(classSalesProductInput).type(name)

    GetBy.className(classCircleProgress).should('be.visible')
    GetBy.className(classCircleProgress).should('not.exist')

    GetBy.spanContains(name).last().click()
  }
}

export default new SalesOrderPage()
