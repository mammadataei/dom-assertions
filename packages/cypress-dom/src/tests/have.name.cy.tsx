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
  cy.get('@input').should('not.have.name', 'Password')

  cy.get('@input').should(($input) => {
    expect($input).to.have.name()
    expect($input).to.have.name('Email')
    expect($input).not.to.have.name('Password')

    expect(() => {
      expect($input).not.to.have.name('Email')
    }).to.throw(
      'Expected the <input> element not to have accessible name "Email"',
    )

    expect(() => {
      expect($input).to.have.name('Password')
    }).to.throw(
      'Expected the <input> element to have accessible name "Password", but received "Email"',
    )
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

    expect(() => {
      expect($input).to.have.name()
    }).to.throw('Expected the <input> element to have an accessible name')

    expect(() => {
      expect($input).to.have.name('Email')
    }).to.throw(
      'Expected the <input> element to have accessible name "Email", but received ""',
    )
  })
})
