import { Inject, Injectable } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: unknown, ttl?: number) {
    return await this.cacheManager.set(key, value, ttl)
  }

  async get(key: string) {
    return await this.cacheManager.get(key)
  }

  async del(key: string) {
    return await this.cacheManager.del(key)
  }

  async reset() {
    return await this.cacheManager.reset()
  }
}
