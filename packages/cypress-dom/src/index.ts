import { Assertions } from '@dom-assertions/chai-dom'

declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      /**
       * Assert that the given element has any/expected description
       * @param chainer
       * @param expected (optional) expected description
       * @example
       *  cy.get('#id').should('have.description')
       *  cy.get('#id').should('have.description', 'expected description')
       */
      (
        chainer: 'have.description',
        expected?: string | RegExp,
      ): Chainable<Subject>

      /**
       * Assert that the given element doesn't have any/expected description
       * @param chainer
       * @param expected (optional) expected description
       * @example
       *  cy.get('#id').should('not.have.description')
       *  cy.get('#id').should('not.have.description', 'expected description')
       */
      (
        chainer: 'not.have.description',
        expected?: string | RegExp,
      ): Chainable<Subject>

      /**
       * Asserts that the given element has any/expected error message
       * @param chainer
       * @param expected (optional) expected error message
       * @example
       *  cy.get('#id').should('not.have.errorMessage')
       *  cy.get('#id').should('not.have.errorMessage', 'expected error message')
       */
      (
        chainer: 'have.errorMessage',
        expected?: string | RegExp,
      ): Chainable<Subject>

      /**
       * Asserts that the given element doesn't have any/expected error message
       * @param chainer
       * @param expected (optional) expected error message
       * @example
       *  cy.get('#id').should('not.have.errorMessage')
       *  cy.get('#id').should('not.have.errorMessage', 'expected error message')
       */
      (
        chainer: 'not.have.errorMessage',
        expected?: string | RegExp,
      ): Chainable<Subject>
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
