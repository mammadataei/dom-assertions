import { assertIsHTMLOrSVGElement } from '../assertIsHTMLOrSVGElement/assertIsHTMLOrSVGElement'
import { elementToString, normalize } from '../utils'

export function assertElementHasErrorMessage(
  htmlElement: HTMLElement,
  expectedErrorMessage?: string | RegExp,
) {
  const elementCheckResult = assertIsHTMLOrSVGElement(htmlElement)
  if (!elementCheckResult.pass) {
    return elementCheckResult
  }

  const elementName = elementToString(htmlElement)

  if (
    !htmlElement.hasAttribute('aria-invalid') ||
    htmlElement.getAttribute('aria-invalid') === 'false'
  ) {
    return {
      pass: false,
      message: `Expected the ${elementName} to be explicitly invalid indicated by "aria-invalid=true", but it wasn't.`,
      negatedMessage: ``,
      expected: 'element to have aria-invalid="true"',
      received: htmlElement.hasAttribute('aria-invalid')
        ? `aria-invalid="${htmlElement.getAttribute('aria-invalid')}"`
        : '',
    }
  }

  const errormessageIDRaw = htmlElement.getAttribute('aria-errormessage') || ''
  const errormessageIDs = errormessageIDRaw.split(/\s+/).filter(Boolean)

  let actualErrorMessage = ''

  if (errormessageIDs.length > 0) {
    const document = htmlElement.ownerDocument

    const errormessageEls = errormessageIDs
      .map((errormessageID) => document.getElementById(errormessageID))
      .filter(Boolean)

    actualErrorMessage = normalize(
      errormessageEls.map((el) => el?.textContent).join(' '),
    )
  }

  const pass =
    expectedErrorMessage !== undefined
      ? expectedErrorMessage instanceof RegExp
        ? expectedErrorMessage.test(actualErrorMessage)
        : expectedErrorMessage === actualErrorMessage
      : Boolean(actualErrorMessage)

  return {
    pass,
    message: `Expected the ${elementName} to have error message${
      expectedErrorMessage
        ? ` "${expectedErrorMessage}", but got "${actualErrorMessage}"`
        : ''
    }.`,
    negatedMessage: `Expected the ${elementName} not to have ${
      expectedErrorMessage
        ? `error message "${expectedErrorMessage}"`
        : 'any error message'
    }.`,
    expected: expectedErrorMessage || '',
    received: actualErrorMessage,
  }
}
