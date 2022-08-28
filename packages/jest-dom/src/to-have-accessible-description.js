import { assertElementHasDescription } from 'dom-assertions'
import { getMessage, resolveAsymmetricStringMatchingValue } from './utils'

export function toHaveAccessibleDescription(
  htmlElement,
  expectedAccessibleDescription,
) {
  const { pass, received } = assertElementHasDescription(
    htmlElement,
    resolveAsymmetricStringMatchingValue(expectedAccessibleDescription),
  )

  return {
    pass,

    message: () => {
      const to = this.isNot ? 'not to' : 'to'
      return getMessage(
        this,
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.${toHaveAccessibleDescription.name}`,
          'element',
          '',
        ),
        `Expected element ${to} have accessible description`,
        expectedAccessibleDescription,
        'Received',
        received,
      )
    },
  }
}
