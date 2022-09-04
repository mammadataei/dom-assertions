it('asserts element is invalid', () => {
  cy.render(<input type="text" aria-invalid />)

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('be.invalid')

  cy.get('@input').should(($input) => {
    expect($input).to.be.invalid
  })
})

it('asserts element is not invalid', () => {
  cy.render(<input type="text" />)

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('not.be.invalid')

  cy.get('@input').should(($input) => {
    expect($input).not.to.be.invalid
  })
})
