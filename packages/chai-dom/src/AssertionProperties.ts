import {
  assertElementIsChecked,
  assertElementIsInvalid,
  assertElementIsRequired,
  assertElementIsValid,
} from 'dom-assertions'
import { AssertionFunction, ChaiPlugin } from './types'

const properties = {
  valid: assertElementIsValid,
  invalid: assertElementIsInvalid,
  checked: assertElementIsChecked,
  required: assertElementIsRequired,
}

type AssertionProperties = { [p in keyof typeof properties]: ChaiPlugin }

export const AssertionProperties = Object.fromEntries(
  Object.entries(properties).map(([name, assertionFunction]) => [
    name,
    createAssertionMethod(name, assertionFunction),
  ]),
) as AssertionProperties

export function createAssertionMethod(
  name: string,
  assert: AssertionFunction,
): ChaiPlugin {
  return function (chia: Chai.ChaiStatic) {
    chia.Assertion.addProperty(name, function () {
      const result = assert(this._obj)

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
