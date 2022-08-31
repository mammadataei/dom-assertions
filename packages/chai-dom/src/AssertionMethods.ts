import {
  assertElementHasDescription,
  assertElementHasErrorMessage,
  assertElementHasName,
} from 'dom-assertions'
import { AssertionFunction, ChaiPlugin } from './types'

const methods = {
  description: assertElementHasDescription,
  name: assertElementHasName,
  errorMessage: assertElementHasErrorMessage,
}

type AssertionMethods = { [p in keyof typeof methods]: ChaiPlugin }

export const AssertionMethods = Object.fromEntries(
  Object.entries(methods).map(([name, assertionFunction]) => [
    name,
    createAssertionMethod(name, assertionFunction),
  ]),
) as AssertionMethods

export function createAssertionMethod(
  name: string,
  assert: AssertionFunction,
): ChaiPlugin {
  return function (chia: Chai.ChaiStatic) {
    chia.Assertion.addMethod(name, function (...args) {
      const result = assert(this._obj, ...args)

      this.assert(
        result.pass,
        result.message,
        result.negatedMessage,
        result.expected,
        result.received,
      )
    })
  }
}
