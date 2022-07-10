import { AssertionFunction } from './types'

function createAssertion(name: string, fn: AssertionFunction): Chai.ChaiPlugin {
  return function (chia: Chai.ChaiStatic) {
    chia.Assertion.addMethod(name, fn)
  }
}

export { createAssertion }
