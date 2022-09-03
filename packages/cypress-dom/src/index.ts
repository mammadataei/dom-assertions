import { AssertionMethods, AssertionProperties } from '@dom-assertions/chai-dom'
import { registerAssertions } from './utils'

import './globals'

registerAssertions(AssertionMethods)
registerAssertions(AssertionProperties, 'property')
