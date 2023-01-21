import { mount } from 'cypress/react18'
import '@testing-library/cypress/add-commands'
import '../../src/'

declare global {
  namespace Cypress {
    interface Chainable {
      render: typeof mount
    }
  }
}

Cypress.Commands.add('render', mount)
