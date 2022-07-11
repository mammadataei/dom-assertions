import { render } from '../../testing'

it('asserts element has error message', () => {
  const { getByLabelText } = render(`
    <label for="password">Password</label>
    <input type="password" id="password" aria-errormessage="error" aria-invalid />
    <p id="error">Password must be at least 8 characters</p>
  `)

  const input = getByLabelText('Password')

  expect(input).to.have.errorMessage()
  expect(input).to.have.errorMessage('Password must be at least 8 characters')
  expect(input).not.to.have.errorMessage('Something else')

  expect(() => expect(input).to.have.errorMessage('Something else')).to.throw(
    'Expected the <input> to have error message "Something else", but got "Password must be at least 8 characters".',
  )

  expect(() => expect(input).not.to.have.errorMessage()).to.throw(
    'Expected the <input> not to have any error message.',
  )

  expect(() =>
    expect(input).not.to.have.errorMessage(
      'Password must be at least 8 characters',
    ),
  ).to.throw(
    'Expected the <input> not to have error message "Password must be at least 8 characters".',
  )
})

it('asserts element does not have error message', () => {
  const { getByLabelText } = render(`
    <label for="password">Password</label>
    <input type="password" id="password"/>

    <label for="email">Email</label>
    <input type="email" id="email" aria-invalid/>
  `)

  const passwordInput = getByLabelText('Password')
  const emailInput = getByLabelText('Email')

  expect(passwordInput).not.to.have.errorMessage()
  expect(passwordInput).not.to.have.errorMessage(
    'Password must be at least 8 characters',
  )

  expect(() => expect(passwordInput).to.have.errorMessage()).to.throw(
    'Expected the <input> to be explicitly invalid indicated by "aria-invalid=true", but it wasn\'t.',
  )

  expect(() =>
    expect(passwordInput).to.have.errorMessage(
      'Password must be at least 8 characters',
    ),
  ).to.throw(
    'Expected the <input> to be explicitly invalid indicated by "aria-invalid=true", but it wasn\'t.',
  )

  expect(emailInput).not.to.have.errorMessage()
  expect(emailInput).not.to.have.errorMessage(
    'Password must be at least 8 characters',
  )

  expect(() => expect(emailInput).to.have.errorMessage()).to.throw(
    'Expected the <input> to have error message.',
  )

  expect(() =>
    expect(emailInput).to.have.errorMessage(
      'Password must be at least 8 characters',
    ),
  ).to.throw(
    'Expected the <input> to have error message "Password must be at least 8 characters", but got "".',
  )
})
