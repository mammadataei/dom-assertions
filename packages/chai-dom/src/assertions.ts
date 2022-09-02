import {
  assertElementHasDescription,
  assertElementHasErrorMessage,
  assertElementHasName,
  assertElementIsChecked,
  assertElementIsInvalid,
  assertElementIsRequired,
  assertElementIsValid,
} from 'dom-assertions'
import { createAssertionMethod, createAssertionProperty, map } from './utils'

const methods = {
  description: assertElementHasDescription,
  name: assertElementHasName,
  errorMessage: assertElementHasErrorMessage,
}

const properties = {
  valid: assertElementIsValid,
  invalid: assertElementIsInvalid,
  checked: assertElementIsChecked,
  required: assertElementIsRequired,
}

export const AssertionMethods = map(methods, createAssertionMethod)
export const AssertionProperties = map(properties, createAssertionProperty)
