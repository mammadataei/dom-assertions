import { assertElementHasName } from 'dom-assertions'
import { createAssertionMethod } from '../utils'

declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Asserts that the given element has any/expected accessible name
       * @see https://w3c.github.io/accname/
       * @param expected (optional) expected name
       * @example
       *  expect($element).to.have.name()
       *  expect($element).to.have.name('expected name')
       */
      name(expected?: string | RegExp): void
    }
  }
}

export const name = createAssertionMethod(
  'name',
  function (expected?: string | RegExp) {
    const result = assertElementHasName(this._obj, expected)

    this.assert(
      result.pass,
      result.message,
      result.negatedMessage,
      result.expected,
      result.received,
    )
  },
)
