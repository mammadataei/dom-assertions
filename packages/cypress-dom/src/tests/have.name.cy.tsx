it('asserts element has name', () => {
  cy.render(
    <div>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" />
    </div>,
  )

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('have.name')
  cy.get('@input').should('have.name', 'Email')

  cy.get('@input').should(($input) => {
    expect($input).to.have.name()
    expect($input).to.have.name('Email')
  })
})

it('asserts element does not have name', () => {
  cy.render(
    <div>
      <input type="email" id="email" />
    </div>,
  )

  cy.findByRole('textbox').as('input')

  cy.get('@input').should('not.have.name')
  cy.get('@input').should('not.have.name', 'Email')

  cy.get('@input').should(($input) => {
    expect($input).not.to.have.name()
    expect($input).not.to.have.name('Email')
  })
})
