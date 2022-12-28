import { render } from '../../testing'
import { assertElementIsDisabled } from './assertElementIsDisabled'
import { roles } from 'aria-query'

const supportedRoles = roles
  .entries()
  .reduce<string[]>((acc, [role, { props }]) => {
    if (props['aria-disabled'] !== undefined) acc.push(role)
    return acc
  }, [])

it('should check the element', () => {
  // @ts-expect-error - in case the client code is using javascript
  expect(assertElementIsDisabled(document)).toEqual({
    pass: false,
    message: expect.any(String),
    negatedMessage: expect.any(String),
    expected: 'HTMLElement or SVGElement',
    received: expect.any(String),
  })
})

it('should pass for disabled checkbox and radio inputs', () => {
  const { getByRole } = render(`
    <input type="checkbox" disabled/>
    <input type="radio" disabled />
  `)

  const checkbox = getByRole('checkbox')
  const radio = getByRole('radio')

  expect(assertElementIsDisabled(checkbox).pass).toEqual(true)
  expect(assertElementIsDisabled(radio).pass).toEqual(true)
})

it('should fail for enable checkbox and radio inputs', () => {
  const { getByRole } = render(`
    <input type="checkbox"/>
    <input type="radio"/>
  `)

  const checkbox = getByRole('checkbox')
  const radio = getByRole('radio')

  expect(assertElementIsDisabled(checkbox)).toEqual({
    pass: false,
    message: 'Expected the <input> element to be disabled',
    negatedMessage: 'Expected the <input> element not to be enabled',
    expected: '',
    received: 'Element is enabled',
  })
  expect(assertElementIsDisabled(radio)).toEqual({
    pass: false,
    message: 'Expected the <input> element to be disabled',
    negatedMessage: 'Expected the <input> element not to be enabled',
    expected: '',
    received: 'Element is enabled',
  })
})

it.each(supportedRoles)(
  'should pass for elements with role `%s` and `aria-disabled="true"`',
  (role) => {
    const { getByRole } = render(`<div role="${role}" aria-disabled="true"/>`)

    expect(assertElementIsDisabled(getByRole(role)).pass).toEqual(true)
  },
)

it.each(supportedRoles)(
  'should fail for elements with role `%s` and `aria-disabled="false"',
  (role) => {
    const { getByRole } = render(`<div role="${role}" aria-disabled="false"/>`)

    expect(assertElementIsDisabled(getByRole(role))).toEqual({
      pass: false,
      message: 'Expected the <div> element to be disabled',
      negatedMessage: 'Expected the <div> element not to be enabled',
      expected: '',
      received: 'Element is enabled',
    })
  },
)
it('should pass for disabled group of elements disabled by their parent', () => {
  const { getByRole } = render(`
    <form>
        <fieldset disabled>
            <input type="checkbox"/>
            <input type="radio"/>
        </fieldset>
    </form>
  `)

  const checkbox = getByRole('checkbox')
  const radio = getByRole('radio')

  expect(assertElementIsDisabled(checkbox).pass).toEqual(true)
  expect(assertElementIsDisabled(radio).pass).toEqual(true)
})

it.only('should pass for `fieldset` tag descendant element excluding the first legend', () => {
  const { getByRole } = render(`
  <fieldset disabled>
    <legend>
      <input type="checkbox"/>
      <input type="radio"/>
    </legend>
  </fieldset>
  `)

  const checkbox = getByRole('checkbox')
  const radio = getByRole('radio')

  expect(assertElementIsDisabled(checkbox).pass).toEqual(false)
  expect(assertElementIsDisabled(radio).pass).toEqual(false)
})
