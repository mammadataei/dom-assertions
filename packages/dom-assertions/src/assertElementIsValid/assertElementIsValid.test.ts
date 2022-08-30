import { render } from '../../testing'
import { assertElementIsValid } from './assertElementIsValid'

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementIsValid(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should pass for elements valid elements', () => {
  const { getByTestId } = render(`
    <div data-testid="valid" />
    <div data-testid="aria-invalid:false" aria-invalid="false" />

    <div data-testid="aria-invalid" aria-invalid />
    <div data-testid="aria-invalid:true" aria-invalid="true" />
  `)

  expect(assertElementIsValid(getByTestId('valid')).pass).toEqual(true)
  expect(assertElementIsValid(getByTestId('aria-invalid:false')).pass).toEqual(
    true,
  )

  expect(assertElementIsValid(getByTestId('aria-invalid'))).toEqual({
    pass: false,
    message: 'Expected the <div> element to be valid.',
    negatedMessage: 'Expected the <div> element to be invalid.',
    expected: '',
    received: '<div> is not valid',
  })
  expect(assertElementIsValid(getByTestId('aria-invalid:true'))).toEqual({
    pass: false,
    message: 'Expected the <div> element to be valid.',
    negatedMessage: 'Expected the <div> element to be invalid.',
    expected: '',
    received: '<div> is not valid',
  })
})

it('should pass for valid form elements', () => {
  const { getByTestId } = render(`
    <form data-testid="form">
      <input type="text" data-testid="input" />

      <select data-testid="select">
        <option>1</option>
      </select>

      <textarea data-testid="textarea"></textarea>
    </form>
  `)

  expect(assertElementIsValid(getByTestId('form')).pass).toEqual(true)
  expect(assertElementIsValid(getByTestId('input')).pass).toEqual(true)
  expect(assertElementIsValid(getByTestId('select')).pass).toEqual(true)
  expect(assertElementIsValid(getByTestId('textarea')).pass).toEqual(true)
})

it('should fail for input, select and textarea elements with aria-invalid attribute', () => {
  const { getByTestId } = render(`
    <div>
      <input type="text" data-testid="input" aria-invalid />

      <select data-testid="select" aria-invalid="true">
        <option>1</option>
      </select>

      <textarea data-testid="textarea" aria-invalid></textarea>
    </form>
  `)

  expect(assertElementIsValid(getByTestId('input'))).toEqual({
    pass: false,
    message: 'Expected the <input> element to be valid.',
    negatedMessage: 'Expected the <input> element to be invalid.',
    expected: '',
    received: '<input> is not valid',
  })

  expect(assertElementIsValid(getByTestId('select'))).toEqual({
    pass: false,
    message: 'Expected the <select> element to be valid.',
    negatedMessage: 'Expected the <select> element to be invalid.',
    expected: '',
    received: '<select> is not valid',
  })

  expect(assertElementIsValid(getByTestId('textarea'))).toEqual({
    pass: false,
    message: 'Expected the <textarea> element to be valid.',
    negatedMessage: 'Expected the <textarea> element to be invalid.',
    expected: '',
    received: '<textarea> is not valid',
  })
})

it('should fail for invalid form elements', () => {
  const { getByTestId } = render(`
    <form data-testid="form">
      <input type="email" data-testid="input" required />

      <select data-testid="select" required>
        <option value="">1</option>
      </select>

      <textarea data-testid="textarea" required></textarea>
    </form>
  `)

  expect(assertElementIsValid(getByTestId('form'))).toEqual({
    pass: false,
    message: 'Expected the <form> element to be valid.',
    negatedMessage: 'Expected the <form> element to be invalid.',
    expected: '',
    received: '<form> is not valid',
  })

  expect(assertElementIsValid(getByTestId('input'))).toEqual({
    pass: false,
    message: 'Expected the <input> element to be valid.',
    negatedMessage: 'Expected the <input> element to be invalid.',
    expected: '',
    received: '<input> is not valid',
  })

  expect(assertElementIsValid(getByTestId('select'))).toEqual({
    pass: false,
    message: 'Expected the <select> element to be valid.',
    negatedMessage: 'Expected the <select> element to be invalid.',
    expected: '',
    received: '<select> is not valid',
  })

  expect(assertElementIsValid(getByTestId('textarea'))).toEqual({
    pass: false,
    message: 'Expected the <textarea> element to be valid.',
    negatedMessage: 'Expected the <textarea> element to be invalid.',
    expected: '',
    received: '<textarea> is not valid',
  })
})
