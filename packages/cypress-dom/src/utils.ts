export function registerAssertions(
  assertions: Record<string, Chai.ChaiPlugin>,
  type: 'method' | 'property' = 'method',
) {
  Object.entries(assertions).forEach(([name, assertion]) => {
    chai.use(assertion)

    chai.use((chai) => {
      if (type === 'method') {
        return chai.Assertion.overwriteMethod(name, createAssertion)
      }

      return chai.Assertion.overwriteProperty(name, createAssertion)
    })
  })
}

function createAssertion(this: Chai.AssertionStatic, ...args: any) {
  return function (this: Chai.AssertionStatic) {
    const [_super, ...rest] = args

    // cypress elements are wrapped in a jquery object,
    // so we need to unwrap them before handing to chai.
    this._obj = unwrapElement(this)
    _super.apply(this, ...rest)
  }
}

function unwrapElement(context: Chai.AssertionStatic) {
  return context._obj[0]
}
