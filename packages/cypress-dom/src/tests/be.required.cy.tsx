it('asserts element is required', () => {
  cy.render(<input type="text" required />)

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('be.required')

  cy.get('@input').should(($input) => {
    expect($input).to.be.required
  })
})

it('asserts element is not required', () => {
  cy.render(<input type="text" />)

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('not.be.required')

  cy.get('@input').should(($input) => {
    expect($input).not.to.be.required
  })
})
