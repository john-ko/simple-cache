import {
  cacheMap,
  cacheStoredValue,
  simpleCacheOptions
} from "./types/index";

export default class SimpleCache {
  readonly cache: cacheMap
  readonly ttl: number

  constructor (options: simpleCacheOptions) {
    this.cache = {}
    this.ttl = options.ttl || 30 // 30 minutes
  }

  exists (key: string): boolean {
    return Boolean(this.cache[key])
  }

  get (key: string): any {
    if (this.exists(key)) {
      return this.cache[key].value
    }

    return undefined
  }

  set (key: string, value: any): any {
    const date = new Date()
    date.setMinutes(date.getMinutes() + this.ttl)
    
    this.cache[key] = this.createCacheStoredValue(date, value)
    
    return value
  }

  async fetch (key: string, callback: () => Promise<any>): Promise<any> {
    const value = this.get(key)

    if (!value || this.isExpired(key)) {
      const results = await callback()
      
      return this.set(key, results)
    }
  
    return value
  }

  isExpired (key: string): boolean {
    return new Date() > this.cache[key].expiration
  }

  createCacheStoredValue (expiration: Date, value: any): cacheStoredValue {
    return {
      expiration,
      value
    }
  }
}