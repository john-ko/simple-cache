import SimpleCache from '../src'

describe('spec (key)', () => {
  let simpleCache: SimpleCache
  let fakeCallback = () => new Promise((resolve, reject) => resolve('hello'))

  beforeEach(() => {
    simpleCache = new SimpleCache({})
  })

  it('creates a new value if it does not exist', async () => {
    const value = await simpleCache.fetch('/users/john', fakeCallback)
    expect(value).toBe('hello')
  })

  it('returns value if key already exists', async () => {
    const value = await simpleCache.fetch('/users/john', fakeCallback)
    const sameValue = await simpleCache.fetch('/users/john', fakeCallback)

    expect(value).toBe(sameValue)
  })

  it('re-fetches when expired', async () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    simpleCache = new SimpleCache({ ttl: -10 })
    const value1 = await simpleCache.fetch('/users/john', callback1)
    const value2 = await simpleCache.fetch('/users/john', callback2)

    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })
})