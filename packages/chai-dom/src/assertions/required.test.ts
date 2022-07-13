import { render } from '../../testing'

it('asserts element is required', () => {
  const { getByRole } = render(`
    <input type="text" required />
  `)

  const input = getByRole('textbox')

  expect(input).to.be.required

  expect(() => expect(input).not.to.be.required).to.throw(
    'Expected the <input> element not to be required.',
  )
})

it('asserts element is not required', () => {
  const { getByRole } = render(`
    <input type="text" />
  `)

  const input = getByRole('textbox')

  expect(input).not.to.be.required

  expect(() => expect(input).to.be.required).to.throw(
    'Expected the <input> element to be required.',
  )
})
