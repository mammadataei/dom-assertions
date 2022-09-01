import { render } from '../../testing'

it('asserts element is valid', () => {
  const { getByRole } = render(`
    <input type="text" />
  `)

  const input = getByRole('textbox')

  expect(input).to.be.valid

  expect(() => expect(input).not.to.be.valid).to.throw(
    'Expected the <input> element to be invalid.',
  )
})

it('asserts element is not valid', () => {
  const { getByRole } = render(`
    <input type="text" aria-invalid />
  `)

  const input = getByRole('textbox')

  expect(input).not.to.be.valid

  expect(() => expect(input).to.be.valid).to.throw(
    'Expected the <input> element to be valid.',
  )
})
