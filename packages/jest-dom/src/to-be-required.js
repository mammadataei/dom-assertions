import { assertElementIsRequired } from 'dom-assertions'

export function toBeRequired(element) {
  const { pass } = assertElementIsRequired(element)

  return {
    pass,
    message: () => {
      const is = pass ? 'is' : 'is not'
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeRequired`,
          'element',
          '',
        ),
        '',
        `Received element ${is} required:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}
