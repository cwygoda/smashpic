import { formatDistance } from './formatters'

describe('formatDistance', () => {
  it('renders rounded kilometers distance', () => {
    const formatted = formatDistance(21.0975, 'k')
    const expected = '21.1km'

    expect(formatted).toBe(expected)
  })

  it('renders rounded miles distance', () => {
    const formatted = formatDistance(21.0975, 'm')
    const expected = '13.2mi'

    expect(formatted).toBe(expected)
  })
})
