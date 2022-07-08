/* eslint-env node */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
  },
  ignorePatterns: ['node_modules/', 'dist/'],
}
