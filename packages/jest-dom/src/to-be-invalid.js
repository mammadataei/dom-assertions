import { assertElementIsInvalid, assertElementIsValid } from 'dom-assertions'

export function toBeInvalid(element) {
  const { pass } = assertElementIsInvalid(element)

  return {
    pass,
    message: () => {
      const is = pass ? 'is' : 'is not'
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeInvalid`,
          'element',
          '',
        ),
        '',
        `Received element ${is} currently invalid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}

export function toBeValid(element) {
  const { pass } = assertElementIsValid(element)

  return {
    pass,
    message: () => {
      const is = pass ? 'is' : 'is not'
      return [
        this.utils.matcherHint(
          `${this.isNot ? '.not' : ''}.toBeValid`,
          'element',
          '',
        ),
        '',
        `Received element ${is} currently valid:`,
        `  ${this.utils.printReceived(element.cloneNode(false))}`,
      ].join('\n')
    },
  }
}
