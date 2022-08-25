import { mount } from 'cypress/react'
import '@testing-library/cypress/add-commands'

declare global {
  namespace Cypress {
    interface Chainable {
      render: typeof mount
    }
  }
}

Cypress.Commands.add('render', mount)
