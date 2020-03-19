import SimpleCache from '../src'
import { cacheStoredValue } from '../src/types'

describe('createCacheStoredValue (key)', () => {
  let simpleCache: SimpleCache
  let cacheStoredValue: cacheStoredValue
  let date: Date
  let expiration: Date
  let value: string

  beforeEach(() => {
    simpleCache = new SimpleCache({})
    date = new Date()
    expiration = new Date(date)
    value = 'werid value'
    cacheStoredValue = simpleCache.createCacheStoredValue(date, value)
  })

  it('returns a date object in the `expiration` key', () => {
    expect(cacheStoredValue.expiration).toStrictEqual(expiration)
  })

  it('returns a value in the `value` key', () => {
    expect(value).toBe('werid value')
  })
})