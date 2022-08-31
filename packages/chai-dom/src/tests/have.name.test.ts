import { render } from '../../testing'

it('asserts element has name', () => {
  const { getByRole } = render(`
    <label for="email">Email</label>
    <input type="email" id="email" />
  `)

  const input = getByRole('textbox')

  expect(input).to.have.name()
  expect(input).to.have.name('Email')
  expect(input).not.to.have.name('Password')

  expect(() => expect(input).to.have.name('Password')).to.throw(
    'Expected the <input> element to have accessible name "Password", but received "Email".',
  )

  expect(() => expect(input).not.to.have.name()).to.throw(
    'Expected the <input> element not to have any accessible names, but received "Email".',
  )

  expect(() => expect(input).not.to.have.name('Email')).to.throw(
    'Expected the <input> element not to have accessible name "Email".',
  )
})

it('asserts element does not have name', () => {
  const { getByRole } = render(`
    <input type="email" id="email"/>
  `)

  const input = getByRole('textbox')

  expect(input).not.to.have.name()
  expect(input).not.to.have.name('Email')

  expect(() => expect(input).to.have.name()).to.throw(
    'Expected the <input> element to have an accessible name.',
  )

  expect(() => expect(input).to.have.name('Email')).to.throw(
    'Expected the <input> element to have accessible name "Email", but received "".',
  )
})
