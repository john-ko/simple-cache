import SimpleCache from '../src'

describe('get (key)', () => {
  let simpleCache: SimpleCache

  beforeEach(() => {
    simpleCache = new SimpleCache({})
  })

  it('returns undefined is key hasnt been set', () => {
    const value = simpleCache.get('key that doesnt exist')

    expect(value).toBe(undefined)
  })

  it('returns value when set', () => {
    simpleCache.set('key', 'value')
    const value = simpleCache.get('key')

    expect(value).toBe('value')
  })
})