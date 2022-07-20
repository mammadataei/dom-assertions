import { assertElementIsInvalid } from 'dom-assertions'
import { createAssertionProperty } from '../../utils'

declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Asserts that the given element is invalid
       * @example
       *  expect($element).to.be.invalid
       *  expect($element).not.to.be.invalid
       */
      invalid: Assertion
    }
  }
}

export const invalid = createAssertionProperty('invalid', function () {
  const result = assertElementIsInvalid(this._obj)

  this.assert(
    result.pass,
    result.message,
    result.negatedMessage,
    result.expected,
    result.received,
  )
})
