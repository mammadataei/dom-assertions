import { assertElementHasDescription } from 'dom-assertions'
import { AssertionFunction } from '../types'

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
    }
  }
}

const description: AssertionFunction = function (expected?: string | RegExp) {
  const result = assertElementHasDescription(this._obj, expected)

  this.assert(
    result.pass,
    result.message,
    result.negatedMessage,
    result.expected,
    result.received,
  )
}

export { description }
