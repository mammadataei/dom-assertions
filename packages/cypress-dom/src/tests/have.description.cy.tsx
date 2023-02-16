it('asserts element has description', () => {
  cy.render(
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" aria-describedby="description" />
      <p id="description">Pick a strong password!</p>
    </div>,
  )

  cy.findByLabelText('Password').as('input')

  cy.get('@input').should('have.description')
  cy.get('@input').should('have.description', 'Pick a strong password!')
  cy.get('@input').should('not.have.description', 'Enter your email address!')

  cy.get('@input').should(($input) => {
    expect($input).to.have.description()
    expect($input).to.have.description('Pick a strong password!')
    expect($input).not.to.have.description('Enter your email address!')

    expect(() => {
      expect($input).not.to.have.description('Pick a strong password!')
    }).to.throw(
      'Expected the <input> element not to have accessible description "Pick a strong password!"',
    )

    expect(() => {
      expect($input).to.have.description('Enter your email address!')
    }).to.throw(
      'Expected the <input> element to have accessible description "Enter your email address!", but received "Pick a strong password!"',
    )
  })
})

it('asserts element does not have description', () => {
  cy.render(
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" />
    </div>,
  )

  cy.findByLabelText('Password').as('input')

  cy.get('@input').should('not.have.description')
  cy.get('@input').should('not.have.description', 'Pick a strong password!')

  cy.get('@input').should(($input) => {
    expect($input).not.to.have.description()
    expect($input).not.to.have.description('Pick a strong password!')

    expect(() => {
      expect($input).to.have.description()
    }).to.throw(
      'Expected the <input> element to have an accessible description',
    )

    expect(() => {
      expect($input).to.have.description('Pick a strong password!')
    }).to.throw(
      'Expected the <input> element to have accessible description "Pick a strong password!", but received ""',
    )
  })
})
