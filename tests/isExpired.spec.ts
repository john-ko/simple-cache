import SimpleCache from '../src'

describe('isExpired (key)', () => {
  let simpleCache: SimpleCache

  beforeEach(() => {
    simpleCache = new SimpleCache({})
  })

  it('returns true if set in the past', () => {
    simpleCache = new SimpleCache({ ttl: -10 })
    simpleCache.set('key', 'value')
    
    expect(simpleCache.isExpired('key')).toBe(true)
  })

  it('returns true when ttl is set for 30m', () => {
    simpleCache = new SimpleCache({ ttl: 30 })
    simpleCache.set('key', 'value')

    expect(simpleCache.isExpired('key')).toBe(false)
  })
})