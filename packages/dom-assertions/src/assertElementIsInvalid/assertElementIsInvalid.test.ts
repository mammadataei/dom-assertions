import { render } from '../../testing'
import { assertElementIsInvalid } from './assertElementIsInvalid'

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementIsInvalid(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should handle elements with aria-invalid attribute', () => {
  const { getByTestId } = render(`
    <div data-testid="aria-invalid" aria-invalid />
    <div data-testid="aria-invalid:true" aria-invalid="true" />

    <div data-testid="valid" />
    <div data-testid="aria-invalid:false" aria-invalid="false" />
  `)

  expect(assertElementIsInvalid(getByTestId('aria-invalid')).pass).toEqual(true)
  expect(assertElementIsInvalid(getByTestId('aria-invalid:true')).pass).toEqual(
    true,
  )

  expect(assertElementIsInvalid(getByTestId('valid'))).toEqual({
    pass: false,
    message: 'Expected the <div> element to be invalid.',
    negatedMessage: 'Expected the <div> element to be valid.',
    expected: '',
    received: '<div> is not invalid',
  })
  expect(assertElementIsInvalid(getByTestId('aria-invalid:false'))).toEqual({
    pass: false,
    message: 'Expected the <div> element to be invalid.',
    negatedMessage: 'Expected the <div> element to be valid.',
    expected: '',
    received: '<div> is not invalid',
  })
})

it('should pass for input, select and textarea elements with aria-invalid attribute', () => {
  const { getByTestId } = render(`
    <div>
      <input type="text" data-testid="input" aria-invalid />

      <select data-testid="select" aria-invalid="true">
        <option>1</option>
      </select>

      <textarea data-testid="textarea" aria-invalid />
    </form>
  `)

  expect(assertElementIsInvalid(getByTestId('input')).pass).toEqual(true)
  expect(assertElementIsInvalid(getByTestId('select')).pass).toEqual(true)
  expect(assertElementIsInvalid(getByTestId('textarea')).pass).toEqual(true)
})

it('should pass for invalid form elements', () => {
  const { getByTestId } = render(`
    <form data-testid="form">
      <input type="email" data-testid="input" required />

      <select data-testid="select" required>
        <option value="">1</option>
      </select>

      <textarea data-testid="textarea" required></textarea>
    </form>
  `)

  expect(assertElementIsInvalid(getByTestId('form')).pass).toEqual(true)
  expect(assertElementIsInvalid(getByTestId('input')).pass).toEqual(true)
  expect(assertElementIsInvalid(getByTestId('select')).pass).toEqual(true)
  expect(assertElementIsInvalid(getByTestId('textarea')).pass).toEqual(true)
})

it('should fail for valid form elements', () => {
  const { getByTestId } = render(`
    <form data-testid="form">
      <input type="text" data-testid="input" />

      <select data-testid="select" >
        <option>1</option>
      </select>

      <textarea data-testid="textarea"></textarea>
    </form>
  `)

  expect(assertElementIsInvalid(getByTestId('form'))).toEqual({
    pass: false,
    message: 'Expected the <form> element to be invalid.',
    negatedMessage: 'Expected the <form> element to be valid.',
    expected: '',
    received: '<form> is not invalid',
  })

  expect(assertElementIsInvalid(getByTestId('input'))).toEqual({
    pass: false,
    message: 'Expected the <input> element to be invalid.',
    negatedMessage: 'Expected the <input> element to be valid.',
    expected: '',
    received: '<input> is not invalid',
  })

  expect(assertElementIsInvalid(getByTestId('select'))).toEqual({
    pass: false,
    message: 'Expected the <select> element to be invalid.',
    negatedMessage: 'Expected the <select> element to be valid.',
    expected: '',
    received: '<select> is not invalid',
  })

  expect(assertElementIsInvalid(getByTestId('textarea'))).toEqual({
    pass: false,
    message: 'Expected the <textarea> element to be invalid.',
    negatedMessage: 'Expected the <textarea> element to be valid.',
    expected: '',
    received: '<textarea> is not invalid',
  })
})
