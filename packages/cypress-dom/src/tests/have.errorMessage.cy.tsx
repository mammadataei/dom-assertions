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

  cy.get('@input').should(($input) => {
    expect($input).to.have.errorMessage()
    expect($input).to.have.errorMessage(
      'Password must be at least 8 characters',
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
  })
})
