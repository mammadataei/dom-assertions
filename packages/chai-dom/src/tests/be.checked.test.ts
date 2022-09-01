import { render } from '../../testing'

it('asserts element is checked', () => {
  const { getByRole } = render(`
    <div role="checkbox" aria-checked="true" />
  `)

  const checkbox = getByRole('checkbox')

  expect(checkbox).to.be.checked

  expect(() => expect(checkbox).not.to.be.checked).to.throw(
    'Expected the <div> element not to be checked',
  )
})

it('asserts element is not checked', () => {
  const { getByRole } = render(`
    <div role="checkbox" aria-checked="false" />
  `)

  const checkbox = getByRole('checkbox')

  expect(checkbox).not.to.be.checked

  expect(() => expect(checkbox).to.be.checked).to.throw(
    'Expected the <div> element to be checked',
  )
})
