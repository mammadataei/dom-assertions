import * as assertions from './assertions'

export default function (chai: Chai.ChaiStatic) {
  Object.entries(assertions).forEach(([name, assertion]) => {
    chai.Assertion.addMethod(name, assertion)
  })
}
