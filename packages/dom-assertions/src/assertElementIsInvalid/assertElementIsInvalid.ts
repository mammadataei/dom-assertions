import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString, getElementTagName } from '../utils'

/**
 * Assert that the given element is invalid.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
 * @see https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation
 */

export function assertElementIsInvalid(htmlElement: HTMLElement) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }

  const elementName = elementToString(htmlElement)
  const isInvalid = isElementInvalid(htmlElement)

  return {
    pass: isInvalid,
    message: `Expected the ${elementName} element to be invalid.`,
    negatedMessage: `Expected the ${elementName} element to be valid.`,
    expected: '',
    received: `${elementName} ${isInvalid ? 'is' : 'is not'} invalid`,
  }
}

function elementHasAriaInvalidAttribute(element: HTMLElement) {
  return (
    element.hasAttribute('aria-invalid') &&
    element.getAttribute('aria-invalid') !== 'false'
  )
}

const elementsWithCheckValidityMethod = ['form', 'input', 'select', 'textarea']

type ElementWithCheckValidityMethod =
  | HTMLFormElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLButtonElement
  | HTMLOutputElement
  | HTMLTextAreaElement

function supportsCheckValidityMethod(
  element: HTMLElement,
): element is ElementWithCheckValidityMethod {
  return elementsWithCheckValidityMethod.includes(getElementTagName(element))
}

function isElementInvalid(element: HTMLElement) {
  if (supportsCheckValidityMethod(element)) {
    return elementHasAriaInvalidAttribute(element) || !element.checkValidity()
  }

  return elementHasAriaInvalidAttribute(element)
}
