import { Module } from '@nestjs/common'
import { DBModule } from './db/db.module'
// import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [DBModule, UsersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
