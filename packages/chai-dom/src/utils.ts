import { AssertionFunction, AssertionType, ChaiPlugin } from './types'

export function createAssertionMethod(
  name: string,
  fn: AssertionFunction,
): ChaiPlugin {
  function plugin(chia: Chai.ChaiStatic) {
    chia.Assertion.addMethod(name, fn)
  }

  plugin.type = 'method' as AssertionType

  return plugin
}

export function createAssertionProperty(
  name: string,
  fn: AssertionFunction,
): ChaiPlugin {
  function plugin(chia: Chai.ChaiStatic) {
    chia.Assertion.addProperty(name, fn)
  }

  plugin.type = 'property' as AssertionType

  return plugin
}
