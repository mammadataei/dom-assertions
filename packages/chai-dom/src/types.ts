export type AssertionFunction = (...args: any[]) => {
  pass: boolean
  message: string
  negatedMessage: string
  expected: string | RegExp
  received: string | RegExp
}

export type ChaiPlugin = (chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) => void
