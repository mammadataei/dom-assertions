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

  cy.get('@input').should(($input) => {
    expect($input).to.have.description()
    expect($input).to.have.description('Pick a strong password!')
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
  })
})
