it('asserts element has error message', () => {
  cy.render(
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        aria-errormessage="error"
        aria-invalid
      />
      <p id="error">Password must be at least 8 characters</p>
    </div>,
  )

  cy.findByLabelText('Password').as('input')

  cy.get('@input').should('have.errorMessage')
  cy.get('@input').should(
    'have.errorMessage',
    'Password must be at least 8 characters',
  )
  cy.get('@input').should('not.have.errorMessage', 'Password is required')

  cy.get('@input').should(($input) => {
    expect($input).to.have.errorMessage()
    expect($input).to.have.errorMessage(
      'Password must be at least 8 characters',
    )

    expect($input).not.to.have.errorMessage('Password is required')

    expect(() => {
      expect($input).not.to.have.errorMessage(
        'Password must be at least 8 characters',
      )
    }).to.throw(
      'Expected the <input> not to have error message "Password must be at least 8 characters"',
    )

    expect(() => {
      expect($input).to.have.errorMessage('Password is required')
    }).to.throw(
      'Expected the <input> to have error message "Password is required", but got "Password must be at least 8 characters"',
    )
  })
})

it('asserts element does not have error message', () => {
  cy.render(
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" />
    </div>,
  )

  cy.findByLabelText('Password').as('input')

  cy.get('@input').should('not.have.errorMessage')
  cy.get('@input').should(
    'not.have.errorMessage',
    'Password must be at least 8 characters',
  )

  cy.get('@input').should(($input) => {
    expect($input).not.to.have.errorMessage()
    expect($input).not.to.have.errorMessage(
      'Password must be at least 8 characters',
    )

    expect(() => {
      expect($input).to.have.errorMessage()
    }).to.throw(
      'Expected the <input> to be explicitly invalid indicated by "aria-invalid=true", but it wasn\'t.',
    )
  })
})
