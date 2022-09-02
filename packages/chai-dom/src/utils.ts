import { AssertionFunction, ChaiPlugin } from './types'

export function map<InputObject, Keys extends keyof InputObject, MappedValue>(
  obj: InputObject,
  callback: (key: Keys, value: any) => MappedValue,
) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      callback(key as Keys, value),
    ]),
  ) as { [p in Keys]: MappedValue }
}

export function createAssertionMethod(
  name: string,
  assert: AssertionFunction,
): ChaiPlugin {
  return function (chia: Chai.ChaiStatic) {
    chia.Assertion.addMethod(name, createAssertion(name, assert))
  }
}

export function createAssertionProperty(
  name: string,
  assert: AssertionFunction,
): ChaiPlugin {
  return function (chia: Chai.ChaiStatic) {
    chia.Assertion.addProperty(name, createAssertion(name, assert))
  }
}

function createAssertion(name: string, assert: AssertionFunction) {
  return function (this: Chai.AssertionStatic, ...args: any) {
    const result = assert(this._obj, ...args)

    this.assert(
      result.pass,
      result.message,
      result.negatedMessage,
      result.expected,
      result.received,
    )
  }
}
