import { assertElementHasErrorMessage } from 'dom-assertions'
import { createAssertion } from '../utils'

declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Asserts that the given element has any/expected error message
       * @param expected (optional) expected error message
       * @example
       *  expect($element).to.have.errorMessage()
       *  expect($element).to.have.errorMessage('expected error message')
       */
      errorMessage(expected?: string | RegExp): void
    }
  }
}

export const errorMessage = createAssertion(
  'errorMessage',
  function (expected?: string | RegExp) {
    const result = assertElementHasErrorMessage(this._obj, expected)

    this.assert(
      result.pass,
      result.message,
      result.negatedMessage,
      result.expected,
      result.received,
    )
  },
)
