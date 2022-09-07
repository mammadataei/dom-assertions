<div align="center">

<h1>@dom-assertions/chai-dom</h1>

<p>Custom chai assertions for testing DOM elements.</p>

</div>

The `@dom-assertions/chai-dom` package provides custom
[Chai](https://chaijs.com/) assertions for writing more declarative, readable,
and maintainable tests.

## Installation

First, install the `@dom-assertions/chai-dom` package.

```sh
npm install --save-dev @dom-assertions/chai-dom

yarn add --dev @dom-assertions/chai-dom

pnpm add --save-dev @dom-assertions/chai-dom
```

Then:

```ts
import ChaiDom from '@dom-assertions/chai-dom'

chai.use(ChaiDom)
```

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
expect(username).to.be.invalid
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
expect(username).to.be.required
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
expect(username).to.be.valid
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
expect(button).to.have.description()
expect(button).to.have.description(
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
expect(email).to.have.errorMessage()
expect(email).to.have.errorMessage('Enter a valid email address')
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
expect(checkbox).to.have.name()
expect(checkbox).to.have.name('I agree to the Terms and Conditions.')
```
