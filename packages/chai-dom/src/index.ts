import * as Assertions from './assertions'

export { Assertions }

export default function ChaiDom(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
  Object.values(Assertions).forEach((assertion: Chai.ChaiPlugin) => {
    assertion(chai, utils)
  })
}
