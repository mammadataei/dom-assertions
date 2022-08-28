import { render } from '../../testing'
import { assertElementHasDescription } from './assertElementHasDescription'

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementHasDescription(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should not pass if element has no description', () => {
  const { getByRole } = render(`
    <button>Move to trash</button>
  `)

  const button = getByRole('button', { name: 'Move to trash' })
  expect(assertElementHasDescription(button)).toEqual({
    pass: false,
    message: 'Expected the <button> element to have an accessible description.',
    negatedMessage:
      'Expected the <button> element not to have any accessible descriptions, but received "".',
    expected: '',
    received: '',
  })
})

it('should pass if element has any description when no `expectedDescription` provided', () => {
  const actual = 'Items in the trash will be permanently removed after 30 days.'

  const { getByRole } = render(`
    <div>
      <button aria-describedby="trash-desc">Move to trash</button>
      <p id="trash-desc">${actual}</p>
    </div>
  `)

  const button = getByRole('button', { name: 'Move to trash' })
  expect(assertElementHasDescription(button).pass).toEqual(true)
})

it('should pass if element has the `expectedDescription`', () => {
  const actual = 'Items in the trash will be permanently removed after 30 days.'

  const { getByRole } = render(`
    <div>
      <button aria-describedby="trash-desc">Move to trash</button>
      <p id="trash-desc">${actual}</p>
    </div>
  `)

  const button = getByRole('button', { name: 'Move to trash' })
  expect(assertElementHasDescription(button, actual).pass).toEqual(true)
})

it('should not pass if expected and actual descriptions are not equal', () => {
  const actual = 'Items in the trash will be permanently removed after 30 days.'

  const { getByRole } = render(`
    <div>
      <button aria-describedby="trash-desc">Move to trash</button>
      <p id="trash-desc">${actual}</p>
    </div>
  `)

  const button = getByRole('button', { name: 'Move to trash' })
  const result = assertElementHasDescription(
    button,
    'Something different than actual description.',
  )

  expect(result).toEqual({
    pass: false,
    message:
      'Expected the <button> element to have accessible description "Something different than actual description.", but received "Items in the trash will be permanently removed after 30 days.".',
    negatedMessage:
      'Expected the <button> element not to have accessible description "Something different than actual description.".',
    expected: 'Something different than actual description.',
    received: 'Items in the trash will be permanently removed after 30 days.',
  })
})

it('should support regex', () => {
  const actual = 'Items in the trash will be permanently removed after 30 days.'

  const { getByRole } = render(`
    <div>
      <button aria-describedby="trash-desc">Move to trash</button>
      <p id="trash-desc">${actual}</p>
    </div>
  `)

  const button = getByRole('button', { name: 'Move to trash' })
  expect(
    assertElementHasDescription(button, /removed after 30 days/).pass,
  ).toEqual(true)
})

it('should work with the link title attribute', () => {
  const { getByRole } = render(`
    <div>
      <a href="/" aria-label="Home page" title="A link to start over">Start</a>
    </div>
  `)

  const link = getByRole('link')
  expect(assertElementHasDescription(link).pass).toEqual(true)
})

it('should work with multiple aria-describedby ids', () => {
  const { getByText } = render(`
    <div>
      <div id="first">First description</div>
      <div id="second">Second description</div>
      <div id="third">Third description</div>

      <div aria-describedby="first second third">Target</div>
    </div>
  `)

  const element = getByText('Target')
  expect(assertElementHasDescription(element).pass).toEqual(true)
})

it('should normalize whitespaces', () => {
  const { getByText } = render(`
    <div id="first">
      Step
        1
          of
            4
    </div>
    
    <div id="second">
      And
        extra
          description
    </div>
    
    <div aria-describedby="first second">Target</div>
  `)

  const element = getByText('Target')
  expect(
    assertElementHasDescription(element, 'Step 1 of 4 And extra description')
      .pass,
  ).toEqual(true)
})
