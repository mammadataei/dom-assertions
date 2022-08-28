import { elementToString } from '../utils'

export function assertIsHTMLOrSVGElement(element: HTMLElement | SVGElement) {
  if (element && element.ownerDocument && element.ownerDocument.defaultView) {
    const window = element.ownerDocument.defaultView

    if (
      element instanceof window.HTMLElement ||
      element instanceof window.SVGElement
    ) {
      return {
        pass: true,
        message: '',
        negatedMessage: '',
        expected: 'HTMLElement or SVGElement',
        received: elementToString(element),
      }
    }
  }

  return {
    pass: false,
    message: `Expected "${element}" to be an HTMLElement or SVGElement`,
    negatedMessage: `Expected "${element}" to be an HTMLElement or SVGElement`,
    expected: 'HTMLElement or SVGElement',
    received: String(element),
  }
}
