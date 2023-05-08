import { Module } from '@nestjs/common'
import { DBModule } from './db/db.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [DBModule, CatsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
