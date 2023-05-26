import { Module } from '@nestjs/common'
import { DBModule } from './db/db.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ArticlesModule } from './articles/articles.module'

@Module({
  imports: [DBModule, AuthModule, UsersModule, ArticlesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
