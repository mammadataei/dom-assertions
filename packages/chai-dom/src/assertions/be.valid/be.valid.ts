import { assertElementIsValid } from 'dom-assertions'
import { createAssertionProperty } from '../../utils'

declare global {
  namespace Chai {
    interface Assertion {
      /**
       * Asserts that the given element is valid
       * @example
       *  expect($element).to.be.valid
       *  expect($element).not.to.be.valid
       */
      valid: Assertion
    }
  }
}

export const valid = createAssertionProperty('valid', function () {
  const result = assertElementIsValid(this._obj)

  this.assert(
    result.pass,
    result.message,
    result.negatedMessage,
    result.expected,
    result.received,
  )
})
