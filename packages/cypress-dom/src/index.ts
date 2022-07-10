import { Assertions } from '@dom-assertions/chai-dom'

declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      /**
       * Chai assertion that checks if a given element has any/expected description
       * @param chainer
       * @param expected (optional) expected data-test-id value
       * @example
       *  cy.get('#id').should('have.description')
       *  cy.get('#id').should('have.description', 'expected value')
       */
      (chainer: 'have.description', expected?: string): Chainable<Subject>

      /**
       * Assert that the given element doesn't have any/expected description
       * @param chainer
       * @param expected (optional) expected data-test-id value
       * @example
       *  cy.get('#id').should('not.have.description')
       *  cy.get('#id').should('not.have.description', 'expected value')
       */
      (chainer: 'not.have.description', expected?: string): Chainable<Subject>
    }
  }
}

Object.entries(Assertions).forEach(([assertionName, assertionPlugin]) => {
  chai.use(assertionPlugin)

  chai.use((chai) => {
    chai.Assertion.overwriteMethod(assertionName, (_super, ...args) => {
      return function (this: Chai.AssertionStatic) {
        // cypress elements are wrapped in a jquery object,
        // so we need to unwrap them before handing to chai.
        this._obj = unwrapElement(this)
        _super.apply(this, ...args)
      }
    })
  })
})

function unwrapElement(context: Chai.AssertionStatic) {
  return context._obj[0]
}
