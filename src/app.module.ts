import { Module } from '@nestjs/common'
import { DBModule } from './db/db.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { ArticlesModule } from './modules/articles/articles.module'
import { RoleModule } from './modules/role/role.module'
import { MenuModule } from './modules/menu/menu.module'

@Module({
  imports: [
    DBModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    RoleModule,
    MenuModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
