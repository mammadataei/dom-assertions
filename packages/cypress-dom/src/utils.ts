export function registerAssertionMethods(
  assertions: Record<string, Chai.ChaiPlugin>,
) {
  Object.entries(assertions).forEach(([name, assertion]) => {
    chai.use(assertion)

    return overwriteAssertionMethod(name)
  })
}

function overwriteAssertionMethod(assertionName: string): void {
  chai.use((chai) => {
    chai.Assertion.overwriteMethod(assertionName, (_super, ...args) => {
      return function (this: Chai.AssertionStatic) {
        // cypress elements are wrapped in a jquery object,
        // so we need to unwrap them before handing to chai.
        this._obj = unwrapElement(this)
        _super.apply(this, ...args)
      }
    })
  })
}

function unwrapElement(context: Chai.AssertionStatic) {
  return context._obj[0]
}
