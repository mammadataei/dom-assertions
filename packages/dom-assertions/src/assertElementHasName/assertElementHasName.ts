import { computeAccessibleName } from 'dom-accessibility-api'
import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString } from '../utils'

export function assertElementHasName(
  htmlElement: HTMLElement,
  expectedName?: string | RegExp,
) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }

  const actualName = computeAccessibleName(htmlElement)
  const elementName = elementToString(htmlElement)

  if (!expectedName) {
    return {
      pass: actualName !== '',
      message: `Expected the ${elementName} element to have an accessible name.`,
      negatedMessage: `Expected the ${elementName} element not to have any accessible names, but received "${actualName}".`,
      expected: '',
      received: actualName,
    }
  }

  const pass =
    expectedName instanceof RegExp
      ? expectedName.test(actualName)
      : actualName === expectedName

  return {
    pass,
    message: `Expected the ${elementName} element to have accessible name "${expectedName}", but received "${actualName}".`,
    negatedMessage: `Expected the ${elementName} element not to have accessible name "${expectedName}".`,
    expected: expectedName,
    received: actualName,
  }
}
