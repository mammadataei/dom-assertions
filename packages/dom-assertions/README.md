<div align="center">

<h1>dom-assertions</h1>

<p>Low-level accessibility assertions for testing DOM elements.</p>

</div>

The `dom-assertions` package provides the low-level functionality for developing
custom matchers/assertions for various test runners and assertion libraries.

## Adapters

- [@dom-assertions/chai-dom](https://github.com/mammadataei/dom-assertions/tree/main/packages/chai-dom)
- [@dom-assertions/cypress-dom](https://github.com/mammadataei/dom-assertions/tree/main/packages/cypress-dom)

## Installation

```sh
npm install --save-dev dom-assertions

yarn add --dev dom-assertions

pnpm add --save-dev dom-assertions
```

## Assertions

- `assertElementHasDescription`
- `assertElementHasErrorMessage`
- `assertElementHasName`
- `assertElementIsInvalid`
- `assertElementIsRequired`
- `assertElementIsValid`

## Credits

Special thanks to [testing-library](https://testing-library.com/) and
[jest-dom](https://github.com/testing-library/jest-dom/blob/main/LICENSE)
[contributors](https://github.com/testing-library/jest-dom/blob/main/README.md#contributors)
for idea, inspiration and development of assertions functionality
