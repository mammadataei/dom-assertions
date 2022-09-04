it('asserts element is checked', () => {
  cy.render(<div role="checkbox" aria-checked="true" />)

  cy.findByRole('checkbox').as('checkbox')

  cy.get('@checkbox').should('be.checked')

  cy.get('@checkbox').should(($checkbox) => {
    expect($checkbox).to.be.checked
  })
})

it('asserts element is not checked', () => {
  cy.render(<div role="checkbox" aria-checked="false" />)

  cy.findByRole('checkbox').as('checkbox')

  cy.get('@checkbox').should('not.be.checked')

  cy.get('@checkbox').should(($checkbox) => {
    expect($checkbox).not.to.be.checked
  })
})
