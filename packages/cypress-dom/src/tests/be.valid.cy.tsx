it('asserts element is valid', () => {
  cy.render(<input type="text" />)

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('be.valid')

  cy.get('@input').should(($input) => {
    expect($input).to.be.valid
  })
})

it('asserts element is not valid', () => {
  cy.render(<input type="text" aria-invalid />)

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('not.be.valid')

  cy.get('@input').should(($input) => {
    expect($input).not.to.be.valid
  })
})
