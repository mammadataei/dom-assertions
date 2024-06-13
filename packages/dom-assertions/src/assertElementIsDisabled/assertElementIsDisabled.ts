import { roles } from 'aria-query'
import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString } from '../utils'

const supportedRoles = roles
  .entries()
  .reduce<string[]>((acc, [role, { props }]) => {
    if (props['aria-disabled'] !== undefined) acc.push(role)
    return acc
  }, [])

export function assertElementIsDisabled(htmlElement: HTMLElement) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }
  const elementName = elementToString(htmlElement)

  return {
    pass: isDisabled(htmlElement),
    message: `Expected the ${elementName} element to be disabled`,
    negatedMessage: `Expected the ${elementName} element not to be enabled`,
    expected: '',
    received: `Element is ${isDisabled(htmlElement) ? 'disabled' : 'enabled'}`,
  }
}

function canBeDisabled(
  htmlElement: HTMLElement,
): htmlElement is HTMLInputElement {
  return [
    'fieldset',
    'input',
    'select',
    'optgroup',
    'option',
    'button',
    'textarea',
  ].includes(htmlElement.tagName.toLowerCase())
}

function elementIsDisabled(htmlElement: HTMLElement) {
  if (canBeDisabled(htmlElement)) return htmlElement.disabled

  return htmlElement.getAttribute('aria-disabled') === 'true'
}

function isDisabledByParent(htmlElementParent: HTMLElement) {
  return elementIsDisabled(htmlElementParent) || isDisabled(htmlElementParent)
}

function isDisabled(htmlElement: HTMLElement): boolean {
  const parentElement = htmlElement.parentElement

  if (parentElement && canBeDisabled(parentElement)) {
    return isDisabledByParent(parentElement)
  }

  return elementIsDisabled(htmlElement)
}
