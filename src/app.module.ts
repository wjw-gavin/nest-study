import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DBConfigModule } from './config/db.config'
import { ApiModule } from './modules/api.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),
    DBConfigModule,
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
