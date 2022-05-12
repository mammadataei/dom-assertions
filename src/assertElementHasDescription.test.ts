import { render } from '../testing'
import { assertElementHasDescription } from './assertElementHasDescription'

it('should not pass if element has no description', () => {
  const { getByRole } = render(`
    <button>Move to trash</button>
  `)

  const button = getByRole('button', { name: 'Move to trash' })
  const { pass, actualDescription } = assertElementHasDescription(button)

  expect(pass).toBe(false)
  expect(actualDescription).toBe('')
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
  const { pass, actualDescription } = assertElementHasDescription(button)

  expect(pass).toBe(true)
  expect(actualDescription).toBe(actual)
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
  const { pass, actualDescription } = assertElementHasDescription(
    button,
    actual,
  )

  expect(pass).toBe(true)
  expect(actualDescription).toBe(actual)
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
  const { pass, actualDescription } = assertElementHasDescription(
    button,
    'Something different than actual description.',
  )

  expect(pass).toBe(false)
  expect(actualDescription).toBe(actual)
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
  const { pass, actualDescription } = assertElementHasDescription(
    button,
    /removed after 30 days/,
  )

  expect(pass).toBe(true)
  expect(actualDescription).toBe(actual)
})

it('should work with the link title attribute', () => {
  const { getByRole } = render(`
    <div>
      <a href="/" aria-label="Home page" title="A link to start over">Start</a>
    </div>
  `)

  const link = getByRole('link')
  const { pass, actualDescription } = assertElementHasDescription(link)

  expect(pass).toBe(true)
  expect(actualDescription).toBe('A link to start over')
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
  const { pass, actualDescription } = assertElementHasDescription(element)

  expect(pass).toBe(true)
  expect(actualDescription).toBe(
    'First description Second description Third description',
  )
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
  const { pass } = assertElementHasDescription(
    element,
    'Step 1 of 4 And extra description',
  )

  expect(pass).toBe(true)
})
