import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DBConfigModule } from './config/db.config'
import { ApiModule } from './modules/api.module'
import { RedisModule } from './shared/redis/redis.mudule'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),
    RedisModule,
    DBConfigModule,
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
