import Chainable = Cypress.Chainable

export class GetBy {
  public static dataCy(name: string): Chainable<JQuery<HTMLElement>> {
    return cy.get(`[data-testid=${name}]`)
  }

  public static className(className: string): Chainable<JQuery<HTMLElement>> {
    return cy.get(`.${className}`)
  }

  public static nameAttr(id: string): Chainable<JQuery<HTMLElement>> {
    return cy.get(`[name=${id}]`)
  }

  public static id(name: string): Chainable<JQuery<HTMLElement>> {
    return cy.get(`[id="${name}"]`)
  }

  public static spanContains(name: string): Chainable<JQuery<HTMLElement>> {
    return cy.get('span').contains(name)
  }
}

export class Support {
  public static typeAndWaitSawing(el: string, value: string, serialNumber: number) {
    GetBy.nameAttr(el).eq(serialNumber).type(value)
    cy.get('div').contains('Not saved').click()
    GetBy.className('saved').should('contain.text', 'All changes saved')
  }

  public static containsValue(element: string, expectText: string) {
    GetBy.nameAttr(element)
      .invoke('val')
      .then(val => expect(val).eq(expectText))
  }

  public static containsEqualValues(selectors: Partial<Record<string, string>>, expectValues: Object) {
    Object.values(selectors).forEach((el, idx) => {
      this.containsValue(el, Object.values(expectValues)[idx])
    })
  }
}
