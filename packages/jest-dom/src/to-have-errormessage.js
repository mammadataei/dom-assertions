import { assertElementHasErrorMessage } from 'dom-assertions'
import { getMessage, resolveAsymmetricStringMatchingValue } from './utils'

// See aria-errormessage spec https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage
export function toHaveErrorMessage(htmlElement, checkWith) {
  const { pass, message, negatedMessage, expected, received } =
    assertElementHasErrorMessage(
      htmlElement,
      resolveAsymmetricStringMatchingValue(checkWith),
    )
  return {
    pass,

    message: () => {
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toHaveErrorMessage`,
          'element',
          '',
        ),
        this.isNot ? negatedMessage : message,
        this.utils.printExpected(expected),
        'Received',
        this.utils.printReceived(received),
      )
    },
  }
}
