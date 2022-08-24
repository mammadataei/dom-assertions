module.exports = {
  extends: ['../../.eslintrc.cjs'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
}
