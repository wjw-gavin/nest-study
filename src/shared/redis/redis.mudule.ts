import { Global, Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { RedisService } from './redis.service'

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        const { env } = process
        return {
          store: await redisStore({
            socket: {
              host: env.REDIS_HOST,
              port: +env.REDIS_PORT
            }
            // password: env.REDIS_PASSWORD,
            // database: +env.REDIS_DB
          })
        }
      }
    })
  ],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
