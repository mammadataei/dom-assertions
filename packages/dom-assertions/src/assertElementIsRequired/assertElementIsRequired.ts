import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString, getElementTagName } from '../utils'

const FORM_TAGS = ['select', 'textarea']

const ARIA_FORM_TAGS = ['input', 'select', 'textarea']

const UNSUPPORTED_INPUT_TYPES = [
  'color',
  'hidden',
  'range',
  'submit',
  'image',
  'reset',
]

const SUPPORTED_ARIA_ROLES = [
  'checkbox',
  'combobox',
  'gridcell',
  'listbox',
  'radiogroup',
  'spinbutton',
  'textbox',
  'tree',
]

export function assertElementIsRequired(htmlElement: HTMLElement) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }

  const elementName = elementToString(htmlElement)
  const isRequired =
    isRequiredOnFormTagsExceptInput(htmlElement) ||
    isRequiredOnSupportedInput(htmlElement) ||
    isElementRequiredByARIA(htmlElement)

  return {
    pass: isRequired,
    message: `Expected the ${elementName} element to be required.`,
    negatedMessage: `Expected the ${elementName} element not to be required.`,
    expected: '',
    received: `${elementName} ${isRequired ? 'is' : 'is not'} required`,
  }
}

function isRequiredOnFormTagsExceptInput(element: HTMLElement) {
  return (
    FORM_TAGS.includes(getElementTagName(element)) &&
    element.hasAttribute('required')
  )
}

function isRequiredOnSupportedInput(element: HTMLElement) {
  return (
    getElementTagName(element) === 'input' &&
    element.hasAttribute('required') &&
    ((element.hasAttribute('type') &&
      !UNSUPPORTED_INPUT_TYPES.includes(element.getAttribute('type')!)) ||
      !element.hasAttribute('type'))
  )
}

function isElementRequiredByARIA(element: HTMLElement) {
  return (
    element.hasAttribute('aria-required') &&
    element.getAttribute('aria-required') === 'true' &&
    (ARIA_FORM_TAGS.includes(getElementTagName(element)) ||
      (element.hasAttribute('role') &&
        SUPPORTED_ARIA_ROLES.includes(element.getAttribute('role')!)))
  )
}
