import { assertElementHasErrorMessage } from './assertElementHasErrorMessage'
import { render } from '../../testing'

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementHasErrorMessage(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should fail if the element is not explicitly invalid (no aria-invalid)', () => {
  const { getByRole } = render(`
    <input type="email" aria-errormessage="error-message" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input)).toEqual({
    pass: false,
    message: `Expected the <input> to be explicitly invalid indicated by "aria-invalid=true", but it wasn't.`,
    negatedMessage: '',
    expected: 'element to have aria-invalid="true"',
    received: '',
  })
})

it('should fail if the element is not explicitly invalid (aria-invalid=false)', () => {
  const { getByRole } = render(`
    <input type="email" aria-errormessage="error-message" aria-invalid="false" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input)).toEqual({
    pass: false,
    message: `Expected the <input> to be explicitly invalid indicated by "aria-invalid=true", but it wasn't.`,
    negatedMessage: '',
    expected: 'element to have aria-invalid="true"',
    received: 'aria-invalid="false"',
  })
})

it('should pass for elements with correct aria-errormessage reference', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="error-message" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input).pass).toEqual(true)
})

it('should fail for wrong aria-errormessage reference', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="wrong-reference" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input)).toEqual({
    pass: false,
    message: 'Expected the <input> to have error message.',
    negatedMessage: 'Expected the <input> not to have any error message.',
    expected: '',
    received: '',
  })
})

it('should pass for elements with wrong error message reference but "" expected error message', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="wrong-reference" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input, '').pass).toEqual(true)
})

it('should pass if the expected aria-errormessage matches the actual', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="error-message" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(
    assertElementHasErrorMessage(input, 'Email is required!').pass,
  ).toEqual(true)
})

it('should fail if the expected aria-errormessage does not match the actual', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="error-message" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input, 'Something else!')).toEqual({
    pass: false,
    message:
      'Expected the <input> to have error message "Something else!", but got "Email is required!".',
    negatedMessage:
      'Expected the <input> not to have error message "Something else!".',
    expected: 'Something else!',
    received: 'Email is required!',
  })
})

it('should support regex', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="error-message" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input, /Email is required/).pass).toEqual(
    true,
  )
})

it('should handle elements with multiple errormessage references', () => {
  const { getByLabelText } = render(`
    <label for="password">Password</label>
    <input id="password" type="password" aria-invalid aria-errormessage="required length complex" />
    <div id="required">Password is required!</div>
    <div id="length">Password must contain at least 8 characters!</div>
    <div id="complex">Password should contain numbers and symbols!</div>
  `)

  const input = getByLabelText('Password')
  const result = assertElementHasErrorMessage(input)

  expect(result.pass).toEqual(true)
  expect(result.received).toEqual(
    'Password is required! Password must contain at least 8 characters! Password should contain numbers and symbols!',
  )

  expect(assertElementHasErrorMessage(input, 'Something else!')).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'Something else!',
    received:
      'Password is required! Password must contain at least 8 characters! Password should contain numbers and symbols!',
  })
})

it('should normalize whitespaces', () => {
  const { getByLabelText } = render(`
    <label for="password">Password</label>
    <input id="password" type="password" aria-invalid aria-errormessage="required length" />
    <div id="required">Password
          is 
            required!
            
    </div>
    <div id="length">
               Password must        contain at 
        least 8 
        characters!
    </div>
  `)

  const input = getByLabelText('Password')
  const result = assertElementHasErrorMessage(input)

  expect(result.pass).toEqual(true)
  expect(assertElementHasErrorMessage(input).received).toEqual(
    'Password is required! Password must contain at least 8 characters!',
  )
})

it('should handle with content spread across descendants', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="error-message" />
    <div id="error-message">
      <span>Email </span>
      <span>    is</span>
      <div><span> required!     </span></div>
    </div>
  `)

  const input = getByRole('textbox')
  const result = assertElementHasErrorMessage(input)

  expect(result.pass).toEqual(true)
  expect(result.received).toEqual('Email is required!')
})

it('should be case-sensitive', () => {
  const { getByRole } = render(`
    <input type="email" aria-invalid aria-errormessage="error-message" />
    <div id="error-message">Email is required!</div>
  `)

  const input = getByRole('textbox')
  expect(assertElementHasErrorMessage(input, 'email Is required')).toEqual({
    pass: false,
    message: `Expected the <input> to have error message "email Is required", but got "Email is required!".`,
    negatedMessage: `Expected the <input> not to have error message "email Is required".`,
    expected: 'email Is required',
    received: 'Email is required!',
  })

  expect(assertElementHasErrorMessage(input, /email Is required/)).toEqual({
    pass: false,
    message: `Expected the <input> to have error message "/email Is required/", but got "Email is required!".`,
    negatedMessage: `Expected the <input> not to have error message "/email Is required/".`,
    expected: /email Is required/,
    received: 'Email is required!',
  })
})
