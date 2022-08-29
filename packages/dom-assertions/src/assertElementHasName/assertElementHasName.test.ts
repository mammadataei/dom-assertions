import { render } from '../../testing'
import { assertElementHasName } from './assertElementHasName'

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementHasName(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should not pass if element has no name', () => {
  const { getByRole } = render(`
      <input type="text" /> 
  `)

  const input = getByRole('textbox')
  const result = assertElementHasName(input)

  expect(result).toEqual({
    pass: false,
    message: 'Expected the <input> element to have an accessible name.',
    negatedMessage:
      'Expected the <input> element not to have any accessible names, but received "".',
    expected: '',
    received: '',
  })
})

it('should pass if element has any name when no `expectedName` provided', () => {
  const { getByRole } = render(`
      <input type="text" aria-label="Email" />
  `)

  const input = getByRole('textbox')
  const result = assertElementHasName(input)

  expect(result.pass).toEqual(true)
})

it('should pass if element has the `expectedName`', () => {
  const { getByRole } = render(`
      <input type="text" aria-label="Email" />
  `)

  const input = getByRole('textbox')
  const result = assertElementHasName(input, 'Email')

  expect(result.pass).toEqual(true)
})

it('should not pass if expected and actual descriptions are not equal', () => {
  const { getByRole } = render(`
      <input type="text" aria-label="Email" />
  `)

  const input = getByRole('textbox')
  const result = assertElementHasName(input, 'Username')

  expect(result).toEqual({
    pass: false,
    message:
      'Expected the <input> element to have accessible name "Username", but received "Email".',
    negatedMessage:
      'Expected the <input> element not to have accessible name "Username".',
    expected: 'Username',
    received: 'Email',
  })
})

it('should support regex', () => {
  const { getByRole } = render(`
      <input type="text" aria-label="Password Confirmation" />
  `)

  const input = getByRole('textbox')
  expect(assertElementHasName(input, /^Password/).pass).toEqual(true)
  expect(assertElementHasName(input, /^some thing else/)).toEqual({
    pass: false,
    message:
      'Expected the <input> element to have accessible name "/^some thing else/", but received "Password Confirmation".',
    negatedMessage:
      'Expected the <input> element not to have accessible name "/^some thing else/".',
    expected: /^some thing else/,
    received: 'Password Confirmation',
  })
})

it("should recognize an element's text content as its label", () => {
  const { getByRole, getByTestId } = render(`
    <div>
      <ul>
        <li role="menuitem" data-testid="first"><strong>First</strong> element</li>
        <li role="menuitem" data-testid="second">Second <em>element</em></li>
      </ul>

      <button data-testid="my-button">
        <strong>Continue</strong> to the next step
      </button>
    </div>
    `)

  const list = getByRole('list')
  expect(assertElementHasName(list)).toEqual({
    pass: false,
    message: 'Expected the <ul> element to have an accessible name.',
    negatedMessage:
      'Expected the <ul> element not to have any accessible names, but received "".',
    expected: '',
    received: '',
  })

  expect(assertElementHasName(getByTestId('first')).pass).toEqual(true)

  expect(assertElementHasName(getByTestId('second')).pass).toEqual(true)

  const button = getByRole('button')
  expect(assertElementHasName(button).pass).toEqual(true)
})

it('should work with label elements', () => {
  const { getByRole } = render(`
    <div>
      <label for="username">Username</label>
      <input type="text" id="username" />

      <label>
        <input type="checkbox" />
        Accept terms and conditions
      </label>
    </div>
  `)

  const usernameInput = getByRole('textbox')
  expect(assertElementHasName(usernameInput).pass).toEqual(true)

  const termsAndConditionsCheckbox = getByRole('checkbox')
  expect(assertElementHasName(termsAndConditionsCheckbox).pass).toEqual(true)
})

it('should work with aria-label attributes', () => {
  const { getByRole } = render(`
    <div>
      <label for="username">Username</label>
      <input type="text" id="username" aria-label="Enter your username"/>

      <label>
        <input type="checkbox" aria-label="Accept our terms and conditions"/>
        Accept terms and conditions
      </label>

      <button type="submit" aria-label="Submit this form">
        Continue
      </button>
    </div>
   `)

  const usernameInput = getByRole('textbox')
  expect(assertElementHasName(usernameInput).pass).toEqual(true)

  const termsAndConditionsCheckbox = getByRole('checkbox')
  expect(assertElementHasName(termsAndConditionsCheckbox).pass).toEqual(true)

  const submitButton = getByRole('button')
  expect(assertElementHasName(submitButton).pass).toEqual(true)
})

it('should work with aria-labelledby attributes', () => {
  const { getByRole } = render(`
    <div>
      <label for="username">Username</label>
      <p id="username-label">Enter your username</p>
      <input type="text" id="username" aria-labelledby="username-label"/>

      <label>
        <input type="checkbox" aria-labelledby="terms-label"/>
        Accept terms and conditions
      </label>
      <p id="terms-label">Accept our terms and conditions</p>

      <p id="submit-label">Submit this form</p>
      <button type="submit" aria-labelledby="submit-label">
        Continue
      </button>
    </div>
 `)

  const usernameInput = getByRole('textbox')
  expect(assertElementHasName(usernameInput).pass).toEqual(true)

  const termsAndConditionsCheckbox = getByRole('checkbox')
  expect(assertElementHasName(termsAndConditionsCheckbox).pass).toEqual(true)

  const submitButton = getByRole('button')
  expect(assertElementHasName(submitButton).pass).toEqual(true)
})

it('should work with image alt attributes', () => {
  const { getByRole, getByTestId } = render(`
    <div>
      <img src="logo.png" alt="Company logo" data-testid="logo" />
      
      <button>
        <img src="close.png" alt="Close modal"  />
      </button>
    </div>
  `)

  const logo = getByTestId('logo')
  expect(assertElementHasName(logo).pass).toEqual(true)

  const closeButton = getByRole('button')
  expect(assertElementHasName(closeButton).pass).toEqual(true)
})

it('should work with svg title attributes', () => {
  const { getByTestId } = render(`
    <svg data-testid="svg"><title>Test title</title></svg>
  `)

  const svg = getByTestId('svg')
  expect(assertElementHasName(svg).pass).toEqual(true)
})
