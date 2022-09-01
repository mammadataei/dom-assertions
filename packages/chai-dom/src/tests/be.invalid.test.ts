import { render } from '../../testing'

it('asserts element is invalid', () => {
  const { getByRole } = render(`
    <input type="text" aria-invalid />
  `)

  const input = getByRole('textbox')

  expect(input).to.be.invalid

  expect(() => expect(input).not.to.be.invalid).to.throw(
    'Expected the <input> element to be valid.',
  )
})

it('asserts element is not invalid', () => {
  const { getByRole } = render(`
    <input type="text" />
  `)

  const input = getByRole('textbox')

  expect(input).not.to.be.invalid

  expect(() => expect(input).to.be.invalid).to.throw(
    'Expected the <input> element to be invalid.',
  )
})
