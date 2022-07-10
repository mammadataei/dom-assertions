import { mount } from 'cypress/react'
import '@testing-library/cypress/add-commands'
import { createRoot, Root } from 'react-dom/client'
import type { ReactNode } from 'react'
import type { MountOptions } from 'cypress/react/dist/mount'

declare global {
  namespace Cypress {
    interface Chainable {
      render: typeof mount
    }
  }
}

Cypress.Commands.add('render', (jsx: ReactNode, options?: MountOptions) => {
  let root: Root | undefined = undefined

  return mount(jsx, {
    ...options,
    ReactDom: {
      render: (_: unknown, rootEl: Element) => {
        root = createRoot(rootEl)
        root.render(jsx)
      },
      unmountComponentAtNode: () => {
        root?.unmount()
        return true
      },
    },
  })
})
