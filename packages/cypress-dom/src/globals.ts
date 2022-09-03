declare global {
  namespace Cypress {
    interface Chainer<Subject> {
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
    }
  }
}

export {}
