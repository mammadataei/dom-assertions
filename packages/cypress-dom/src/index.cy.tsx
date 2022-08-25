export {}

it('should work', () => {
  cy.render(<div>Hello world!</div>)
  cy.findByText('Hello world!').should('exist')
})
