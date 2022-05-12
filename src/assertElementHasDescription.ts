import { computeAccessibleDescription } from 'dom-accessibility-api'

export function assertElementHasDescription(
  htmlElement: HTMLElement,
  expectedDescription?: string | RegExp,
) {
  const actualDescription = computeAccessibleDescription(htmlElement)

  if (!expectedDescription) {
    return {
      pass: actualDescription !== '',
      actualDescription,
    }
  }

  return {
    pass:
      expectedDescription instanceof RegExp
        ? expectedDescription.test(actualDescription)
        : actualDescription === expectedDescription,
    actualDescription,
  }
}
