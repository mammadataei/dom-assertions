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
