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

      /**
       * Asserts that the given element has any/expected name
       * @param chainer
       * @param expected (optional) expected name
       * @example
       *  cy.get('#id').should('have.name')
       *  cy.get('#id').should('have.name', 'expected name')
       */
      (chainer: 'have.name', expected?: string | RegExp): Chainable<Subject>

      /**
       * Asserts that the given element doesn't have any/expected name
       * @param chainer
       * @param expected (optional) expected name
       * @example
       *  cy.get('#id').should('not.have.name')
       *  cy.get('#id').should('not.have.name', 'expected name')
       */
      (chainer: 'not.have.name', expected?: string | RegExp): Chainable<Subject>

      /**
       * Asserts that the given element is required
       * @param chainer
       * @example
       *  cy.get('#id').should('be.required')
       */
      (chainer: 'be.required'): Chainable<Subject>

      /**
       * Asserts that the given element is not required
       * @param chainer
       * @example
       *  cy.get('#id').should('not.be.required')
       */
      (chainer: 'not.be.required'): Chainable<Subject>

      /**
       * Asserts that the given element is invalid
       * @param chainer
       * @example
       *  cy.get('#id').should('be.invalid')
       */
      (chainer: 'be.invalid'): Chainable<Subject>

      /**
       * Asserts that the given element is not invalid
       * @param chainer
       * @example
       *  cy.get('#id').should('not.be.invalid')
       */
      (chainer: 'not.be.invalid'): Chainable<Subject>

      /**
       * Asserts that the given element is valid
       * @param chainer
       * @example
       *  cy.get('#id').should('be.valid')
       */
      (chainer: 'be.valid'): Chainable<Subject>

      /**
       * Asserts that the given element is not valid
       * @param chainer
       * @example
       *  cy.get('#id').should('not.be.valid')
       */
      (chainer: 'not.be.valid'): Chainable<Subject>
    }
  }
}

Object.entries(Assertions).forEach(([assertionName, assertionPlugin]) => {
  chai.use(assertionPlugin)

  if (assertionPlugin.type === 'method') {
    return overwriteAssertionMethod(assertionName)
  }

  return overwriteAssertionProperty(assertionName)
})

function overwriteAssertionMethod(assertionName: string): void {
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
}

declare global {
  namespace Chai {
    interface AssertionStatic {
      // Temporarily fixing the @types/chai-dom issue
      // TODO: find a better solution to prevent changing Chai namespace globally
      overwriteProperty(
        name: string,
        method: (this: AssertionStatic, ...args: any[]) => any,
      ): void
    }
  }
}

function overwriteAssertionProperty(assertionName: string): void {
  chai.use((chai) => {
    chai.Assertion.overwriteProperty(assertionName, (_super) => {
      return function (this: Chai.AssertionStatic) {
        this._obj = unwrapElement(this)
        _super.apply(this)
      }
    })
  })
}

function unwrapElement(context: Chai.AssertionStatic) {
  return context._obj[0]
}
