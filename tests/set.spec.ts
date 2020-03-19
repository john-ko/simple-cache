import SimpleCache from '../src'

describe('set (key)', () => {
  let simpleCache: SimpleCache

  beforeEach(() => {
    simpleCache = new SimpleCache({})
  })

  it('sets value', () => {
    const value = 'werid value'
    simpleCache.set('key', value)

    expect(simpleCache.get('key')).toBe('werid value')
  })
})