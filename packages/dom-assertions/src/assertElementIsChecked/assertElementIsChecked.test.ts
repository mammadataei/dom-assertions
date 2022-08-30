import { roles } from 'aria-query'
import { render } from '../../../../testing/render'
import { assertElementIsChecked } from './assertElementIsChecked'

const supportedRoles = roles
  .entries()
  .reduce<string[]>((acc, [role, { props }]) => {
    if (props['aria-checked'] !== undefined) acc.push(role)
    return acc
  }, [])

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementIsChecked(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should pass for checked checkbox and radio inputs', () => {
  const { getByRole } = render(`
    <input type="checkbox" checked />
    <input type="radio" checked />
  `)

  const checkbox = getByRole('checkbox')
  const radio = getByRole('radio')

  expect(assertElementIsChecked(checkbox).pass).toEqual(true)
  expect(assertElementIsChecked(radio).pass).toEqual(true)
})

it('should fail for un-checked checkbox and radio inputs', () => {
  const { getByRole } = render(`
    <input type="checkbox" />
    <input type="radio" />
  `)

  const checkbox = getByRole('checkbox')
  const radio = getByRole('radio')

  expect(assertElementIsChecked(checkbox)).toEqual({
    pass: false,
    message: 'Expected the <input> element to be checked',
    negatedMessage: 'Expected the <input> element not to be checked',
    expected: '',
    received: 'Element is not checked',
  })

  expect(assertElementIsChecked(radio)).toEqual({
    pass: false,
    message: 'Expected the <input> element to be checked',
    negatedMessage: 'Expected the <input> element not to be checked',
    expected: '',
    received: 'Element is not checked',
  })
})

it.each(supportedRoles)(
  'should pass for elements with role `%s` and `aria-checked="true"`',
  (role) => {
    const { getByRole } = render(`<div role="${role}" aria-checked="true"/>`)

    expect(assertElementIsChecked(getByRole(role)).pass).toEqual(true)
  },
)

it.each(supportedRoles)(
  'should fail for elements with role `%s` and `aria-checked="false"',
  (role) => {
    const { getByRole } = render(`<div role="${role}" aria-checked="false"/>`)

    expect(assertElementIsChecked(getByRole(role))).toEqual({
      pass: false,
      message: 'Expected the <div> element to be checked',
      negatedMessage: 'Expected the <div> element not to be checked',
      expected: '',
      received: 'Element is not checked',
    })
  },
)

it('should fail for input elements with type other than checkbox or radio', () => {
  const { getByRole } = render(`<input type="text" />`)

  expect(assertElementIsChecked(getByRole('textbox'))).toEqual({
    pass: false,
    message: expect.stringMatching(/Only .* can be asserted to be checked/),
    negatedMessage: expect.stringMatching(
      /Only .* can be asserted to be checked/,
    ),
    expected: '',
    received: '',
  })
})

it('should fail for unsupported elements', () => {
  const { getByRole } = render(`<select></select>`)

  expect(assertElementIsChecked(getByRole('combobox'))).toEqual({
    pass: false,
    message: expect.stringMatching(/Only .* can be asserted to be checked/),
    negatedMessage: expect.stringMatching(
      /Only .* can be asserted to be checked/,
    ),
    expected: '',
    received: '',
  })
})

it('should fail for unsupported roles', () => {
  const { getByRole } = render(`<div role="button" aria-checked="true"/>`)

  expect(assertElementIsChecked(getByRole('button'))).toEqual({
    pass: false,
    message: expect.stringMatching(/Only .* can be asserted to be checked/),
    negatedMessage: expect.stringMatching(
      /Only .* can be asserted to be checked/,
    ),
    expected: '',
    received: '',
  })
})

it('should fail for invalid `aria-checked` values', () => {
  const { getByRole } = render(`<div role="checkbox" aria-checked="mixed"/>`)

  expect(assertElementIsChecked(getByRole('checkbox'))).toEqual({
    pass: false,
    message: expect.stringMatching(/Only .* can be asserted to be checked/),
    negatedMessage: expect.stringMatching(
      /Only .* can be asserted to be checked/,
    ),
    expected: '',
    received: '',
  })
})
