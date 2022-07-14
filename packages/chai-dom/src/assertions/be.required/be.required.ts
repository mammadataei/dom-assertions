import { assertElementIsRequired } from 'dom-assertions'
import { createAssertionProperty } from '../../utils'

declare global {
  namespace Chai {
    interface Assertion {
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

export const required = createAssertionProperty('required', function () {
  const result = assertElementIsRequired(this._obj)

  this.assert(
    result.pass,
    result.message,
    result.negatedMessage,
    result.expected,
    result.received,
  )
})
