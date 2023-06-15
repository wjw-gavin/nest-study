import { Module } from '@nestjs/common'
import { DBModule } from './db/db.module'
import { MenuModule } from './modules/menu/menu.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { RoleModule } from './modules/role/role.module'
import { ArticleModule } from './modules/article/article.module'

@Module({
  imports: [
    DBModule,
    MenuModule,
    AuthModule,
    UserModule,
    RoleModule,
    ArticleModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
