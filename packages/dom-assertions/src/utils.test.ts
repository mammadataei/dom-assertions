import { toSentence } from './utils'

describe('toSentence', () => {
  it('turns array into string of comma separated list with default last word connector', () => {
    expect(toSentence(['one', 'two', 'three'])).toBe('one, two and three')
  })

  it('supports custom word connector', () => {
    expect(toSentence(['one', 'two', 'three'], { wordConnector: '; ' })).toBe(
      'one; two and three',
    )
  })

  it('supports custom last word connector', () => {
    expect(
      toSentence(['one', 'two', 'three'], { lastWordConnector: ' or ' }),
    ).toBe('one, two or three')
  })

  it('turns one element array into string containing first element', () => {
    expect(toSentence(['one'])).toBe('one')
  })

  it('turns empty array into empty string', () => {
    expect(toSentence([])).toBe('')
  })
})
