import { assertElementIsInvalid } from '../assertElementIsInvalid/assertElementIsInvalid'
import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString } from '../utils'

/**
 * Assert that the given element is valid.
 */
export function assertElementIsValid(htmlElement: HTMLElement) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }

  const elementName = elementToString(htmlElement)
  const isValid = !assertElementIsInvalid(htmlElement).pass

  return {
    pass: isValid,
    message: `Expected the ${elementName} element to be valid.`,
    negatedMessage: `Expected the ${elementName} element to be invalid.`,
    expected: '',
    received: `${elementName} ${isValid ? 'is' : 'is not'} valid`,
  }
}
