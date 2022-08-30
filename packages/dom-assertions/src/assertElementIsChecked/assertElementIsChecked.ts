import { roles } from 'aria-query'
import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString, toSentence } from '../utils'

const supportedRoles = roles
  .entries()
  .reduce<string[]>((acc, [role, { props }]) => {
    if (props['aria-checked'] !== undefined) acc.push(role)
    return acc
  }, [])

export function assertElementIsChecked(htmlElement: HTMLElement) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }

  const elementName = elementToString(htmlElement)

  if (!isValidInput(htmlElement) && !isValidAriaElement(htmlElement)) {
    const message =
      'Only inputs with type="checkbox" or type="radio", or elements with ' +
      `${supportedRolesToSentence()} and a valid "aria-checked" attribute ` +
      'can be asserted to be checked'

    return {
      pass: false,
      message,
      negatedMessage: message,
      expected: '',
      received: '',
    }
  }

  function isChecked() {
    if (isValidInput(htmlElement)) return htmlElement.checked
    return htmlElement.getAttribute('aria-checked') === 'true'
  }

  return {
    pass: isChecked(),
    message: `Expected the ${elementName} element to be checked`,
    negatedMessage: `Expected the ${elementName} element not to be checked`,
    expected: '',
    received: `Element is ${isChecked() ? 'checked' : 'not checked'}`,
  }
}

function isValidAriaElement(htmlElement: HTMLElement) {
  return (
    supportedRoles.includes(htmlElement.getAttribute('role')!) &&
    ['true', 'false'].includes(htmlElement.getAttribute('aria-checked')!)
  )
}

function isValidInput(
  htmlElement: HTMLElement,
): htmlElement is HTMLInputElement {
  return (
    isHTMLInputElement(htmlElement) &&
    ['checkbox', 'radio'].includes(htmlElement.type)
  )
}

function isHTMLInputElement(
  htmlElement: HTMLElement,
): htmlElement is HTMLInputElement {
  return htmlElement.tagName.toLowerCase() === 'input'
}

function supportedRolesToSentence() {
  return toSentence(
    supportedRoles.map((role) => `role="${role}"`),
    { lastWordConnector: ' or ' },
  )
}
