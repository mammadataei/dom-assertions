import * as exports from './'

it('should export correct assertions', () => {
  expect(Object.keys(exports)).toEqual([
    'assertElementHasDescription',
    'assertElementHasErrorMessage',
    'assertElementHasName',
    'assertElementIsInvalid',
    'assertElementIsRequired',
    'assertElementIsValid',
  ])
})
