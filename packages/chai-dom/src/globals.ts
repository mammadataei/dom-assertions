declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Chai assertion that checks if a given element has accessible description
       * @param expectedDescription (optional) expected description
       * @example
       *  expect($element).to.have.description()
       *  expect($element).to.have.description('expected value')
       */
      description(expectedDescription?: string | RegExp): void

      /**
       * Asserts that the given element has any/expected error message
       * @param expected (optional) expected error message
       * @example
       *  expect($element).to.have.errorMessage()
       *  expect($element).to.have.errorMessage('expected error message')
       */
      errorMessage(expected?: string | RegExp): void

      /**
       * Asserts that the given element is invalid
       * @example
       *  expect($element).to.be.invalid
       *  expect($element).not.to.be.invalid
       */
      invalid: Assertion

      /**
       * Asserts that the given element has any/expected accessible name
       * @see https://w3c.github.io/accname/
       * @param expected (optional) expected name
       * @example
       *  expect($element).to.have.name()
       *  expect($element).to.have.name('expected name')
       */

      name(expected?: string | RegExp): void

      /**
       * Asserts that the given element is required
       * @example
       *  expect($element).to.be.required
       *  expect($element).not.to.be.required
       */
      required: Assertion
    }
  }
}

export {}
