import {
  cacheMap,
  cacheStoredValue,
  simpleCacheOptions
} from "./types/index";

export default class SimpleCache {
  readonly timeout: number
  readonly ttl: number
  readonly cache: cacheMap

  constructor (options: simpleCacheOptions) {
    this.cache = {}
    this.timeout = options.timeout || 0
    this.ttl = options.ttl || 30 // 30 minutes
  }

  async fetch (key: string = '', callback: () => Promise<any>): Promise<any> {
    if (!this.cacheExists(key) || this.hasCacheExpired(key)) {
      const results = await callback()
      
      return this.setCache(key, results)
    }
  
    return this.cache[key].value
  }

  hasCacheExpired (key: string = ''): boolean {
    return new Date() > this.cache[key].expiration
  }

  cacheExists (key: string = ''): boolean {
    return Boolean(this.cache[key])
  }

  setCache (key: string = '', value: any): any {
    const date = new Date()
    date.setMinutes(date.getMinutes() + this.ttl)
    
    this.cache[key] = this.createCacheStoredValue(date, value)
    
    return value
  }

  createCacheStoredValue (expiration: Date, value: any): cacheStoredValue {
    return {
      expiration,
      value
    }
  }
}