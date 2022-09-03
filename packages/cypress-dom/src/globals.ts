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
    }
  }
}

export {}
