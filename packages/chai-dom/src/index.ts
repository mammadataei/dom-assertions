import { AssertionMethods } from './AssertionMethods'

import './globals'

export const Assertions = { ...AssertionMethods }
export { AssertionMethods }

export default function (chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
  Object.values(Assertions).forEach((assertion: Chai.ChaiPlugin) => {
    assertion(chai, utils)
  })
}
