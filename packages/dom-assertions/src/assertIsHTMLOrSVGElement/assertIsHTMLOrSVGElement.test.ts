import { assertIsHTMLOrSVGElement } from './assertIsHTMLOrSVGElement'

it('should pass for correct html element', () => {
  const element = document.createElement('p')
  expect(assertIsHTMLOrSVGElement(element).pass).toEqual(true)
})

it('should pass for correct svg element', () => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  expect(assertIsHTMLOrSVGElement(element).pass).toEqual(true)
})

it('should pass for body', () => {
  expect(assertIsHTMLOrSVGElement(document.body).pass).toEqual(true)
})

it('should fail for undefined', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertIsHTMLOrSVGElement(undefined)).toEqual({
    pass: false,
    message: 'Expected "undefined" to be an HTMLElement or SVGElement',
    negatedMessage: `Expected "undefined" to be an HTMLElement or SVGElement`,
    expected: 'HTMLElement or SVGElement',
    received: 'undefined',
  })
})

it('should fail for document', () => {
  const elementName = String(document)

  // @ts-expect-error - in case the client code is using javascript
  expect(assertIsHTMLOrSVGElement(document)).toEqual({
    pass: false,
    message: `Expected "${elementName}" to be an HTMLElement or SVGElement`,
    negatedMessage: `Expected "${elementName}" to be an HTMLElement or SVGElement`,
    expected: 'HTMLElement or SVGElement',
    received: elementName,
  })
})

it('should fail for functions', () => {
  const fn = () => 'hello world!'
  const elementName = String(fn)

  // @ts-expect-error - in case the client code is using javascript
  expect(assertIsHTMLOrSVGElement(fn)).toEqual({
    pass: false,
    message: `Expected "${elementName}" to be an HTMLElement or SVGElement`,
    negatedMessage: `Expected "${elementName}" to be an HTMLElement or SVGElement`,
    expected: 'HTMLElement or SVGElement',
    received: elementName,
  })
})

it('should fail for element-like objects', () => {
  class FakeObject {}
  const element = {
    ownerDocument: {
      defaultView: { HTMLElement: FakeObject, SVGElement: FakeObject },
    },
  }
  const elementName = String(element)

  // @ts-expect-error - in case the client code is using javascript
  expect(assertIsHTMLOrSVGElement(element)).toEqual({
    pass: false,
    message: `Expected "${elementName}" to be an HTMLElement or SVGElement`,
    negatedMessage: `Expected "${elementName}" to be an HTMLElement or SVGElement`,
    expected: 'HTMLElement or SVGElement',
    received: elementName,
  })
})
