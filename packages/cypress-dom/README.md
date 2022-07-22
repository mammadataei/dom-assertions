<div align="center">

<h1>@dom-assertions/cypress-dom</h1>

<p>Custom cypress assertions for testing DOM elements.</p>

</div>

The `@dom-assertions/cypress-dom` package provides custom assertions to make
your [Cypress](https://www.cypress.io/) tests more declarative, readable, and
maintainable.

## Installation

First, install the `@dom-assertions/cypress-dom` package.

```sh
npm install --save-dev @dom-assertions/cypress-dom

yarn add --dev @dom-assertions/cypress-dom

pnpm add --save-dev @dom-assertions/cypress-dom
```

Then, import it into `cypress/support/commands.ts`

```ts
import '@dom-assertions/cypress-dom'
```

Note: We recommend using
[Cypress Testing Library](https://github.com/testing-library/cypress-testing-library)
with this library for writing more readable and accessibility-driven tests.

## Assertions

### `be.invalid`

Asserts that the given element is invalid.

#### Example

```html
<div>
  <label for="username">Username</label>
  <input id="username" type="text" aria-invalid="true" />
</div>
```

```tsx
cy.findByLabelText('Username').should('be.invalid')
```

### `be.required`

Asserts that the given element is required.

#### Example

```html
<div>
  <label for="username">Username</label>
  <input id="username" type="text" required />
</div>
```

```tsx
cy.findByLabelText('Username').should('be.required')
```

### `be.valid`

Asserts that the given element is valid.

#### Example

```html
<div>
  <label for="username">Username</label>
  <input id="username" type="text" />
</div>
```

```tsx
cy.findByLabelText('Username').should('be.valid')
```

### `have.description`

Asserts that the given element has the expected
[accessible description](https://w3c.github.io/accname/).

#### Example

```html
<button aria-describedby="trash-desc">Move to trash</button>
<p id="trash-desc">
  Items in the trash will be permanently removed after 30 days.
</p>
```

```tsx
cy.findByRole('button', { name: 'Move to trash' }).should('have.description')
cy.findByRole('button', { name: 'Move to trash' }).should(
  'have.description',
  'Items in the trash will be permanently removed after 30 days.',
)
```

### `have.errorMessage`

Asserts that the given element has the expected
[ARIA error message](https://www.w3.org/TR/wai-aria/#aria-errormessage). Please
note that the element should indicate an error state using `aria-invalid` set to
`true`.

#### Example

```html
<label for="email">Email</label>
<input
  type="email"
  name="email"
  id="email"
  aria-invalid="true"
  aria-errormessage="error-message"
/>
<span id="error-message">Enter a valid email address</span>
```

```tsx
cy.findByLabelText('Email').should('have.errorMessage')
cy.findByLabelText('Email').should(
  'have.errorMessage',
  'Enter a valid email address',
)
```

### `have.name`

Asserts that the given element has the expected
[accessible name](https://w3c.github.io/accname/).

#### Example

```html
<span
  role="checkbox"
  aria-checked="false"
  tabindex="0"
  aria-labelledby="label"
/>
<span id="label">I agree to the Terms and Conditions.</span>
```

```tsx
cy.findByRole('checkbox').should('have.name')
cy.findByRole('checkbox').should(
  'have.name',
  'I agree to the Terms and Conditions.',
)
```
