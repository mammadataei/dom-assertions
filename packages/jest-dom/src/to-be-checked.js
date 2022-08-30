import { assertElementIsChecked } from 'dom-assertions'

export function toBeChecked(element) {
  const { pass, message, negatedMessage } = assertElementIsChecked(element)

  return {
    pass,
    message: () => {
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeChecked`,
          'element',
          '',
        ),
        '',
        this.isNot ? negatedMessage : message,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}
