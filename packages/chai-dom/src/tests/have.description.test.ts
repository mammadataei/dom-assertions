import { render } from '../../testing'

it('asserts element has description', () => {
  const { getByLabelText } = render(`
    <label for="password">Password</label>
    <input type="password" id="password" aria-describedby="description" />
    <p id="description">Pick a strong password!</p>
  `)

  const input = getByLabelText('Password')

  expect(input).to.have.description()
  expect(input).to.have.description('Pick a strong password!')
  expect(input).not.to.have.description('Hello World')

  expect(() => expect(input).to.have.description('Hello World')).to.throw(
    'Expected the <input> element to have accessible description "Hello World", but received "Pick a strong password!".',
  )

  expect(() => expect(input).not.to.have.description()).to.throw(
    'Expected the <input> element not to have any accessible descriptions, but received "Pick a strong password!".',
  )

  expect(() =>
    expect(input).not.to.have.description('Pick a strong password!'),
  ).to.throw(
    'Expected the <input> element not to have accessible description "Pick a strong password!".',
  )
})

it('asserts element does not have description', () => {
  const { getByLabelText } = render(`
    <label for="password">Password</label>
    <input type="password" id="password"/>
  `)

  const input = getByLabelText('Password')

  expect(input).not.to.have.description()
  expect(input).not.to.have.description('Pick a strong password!')

  expect(() => expect(input).to.have.description()).to.throw(
    'Expected the <input> element to have an accessible description.',
  )

  expect(() =>
    expect(input).to.have.description('Pick a strong password!'),
  ).to.throw(
    'Expected the <input> element to have accessible description "Pick a strong password!", but received "".',
  )
})
