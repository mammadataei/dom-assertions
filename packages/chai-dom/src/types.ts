export type AssertionFunction = (this: Chai.AssertionStatic) => void

export type AssertionType = 'method' | 'property'

export type ChaiPlugin = {
  (chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): void
  type: AssertionType
}
