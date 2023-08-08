import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
// import { ConfigModule, ConfigService } from '@nestjs/config'
import { redisStore } from 'cache-manager-redis-yet'
import { RedisCacheService } from './redis.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const { env } = process
        return {
          store: await redisStore({
            socket: {
              host: env.REDIS_HOST,
              port: +env.REDIS_PORT
            },
            password: env.REDIS_PASSWORD,
            database: +env.REDIS_DB
          })
        }
      }
    })
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}
