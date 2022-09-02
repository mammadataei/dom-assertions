import { AssertionMethods, AssertionProperties } from './assertions'

import './globals'

export const Assertions = { ...AssertionMethods, ...AssertionProperties }
export { AssertionMethods, AssertionProperties }

export default function (chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
  Object.values(Assertions).forEach((assertion: Chai.ChaiPlugin) => {
    assertion(chai, utils)
  })
}
