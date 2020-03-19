import SimpleCache from '../src'

describe('exists (key)', () => {
  let simpleCache: SimpleCache

  beforeEach(() => {
    simpleCache = new SimpleCache({})
  })

  it('returns true if key exists', () => {
    simpleCache.set('key', 'value')

    expect(simpleCache.exists('key')).toBe(true)
  })

  it('returns false when a key does not exist', () => {
    expect(simpleCache.exists('key')).toBe(false)
  })
})