import { computeAccessibleDescription } from 'dom-accessibility-api'
import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString } from '../utils'

export function assertElementHasDescription(
  htmlElement: HTMLElement,
  expectedDescription?: string | RegExp,
) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }

  const actualDescription = computeAccessibleDescription(htmlElement)
  const elementName = elementToString(htmlElement)

  if (!expectedDescription) {
    return {
      pass: actualDescription !== '',
      message: `Expected the ${elementName} element to have an accessible description.`,
      negatedMessage: `Expected the ${elementName} element not to have any accessible descriptions, but received "${actualDescription}".`,
      expected: '',
      received: actualDescription,
    }
  }

  const pass =
    expectedDescription instanceof RegExp
      ? expectedDescription.test(actualDescription)
      : actualDescription === expectedDescription

  return {
    pass,
    message: `Expected the ${elementName} element to have accessible description "${expectedDescription}", but received "${actualDescription}".`,
    negatedMessage: `Expected the ${elementName} element not to have accessible description "${expectedDescription}".`,
    expected: expectedDescription,
    received: actualDescription,
  }
}
