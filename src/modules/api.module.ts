import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import { RolesGuard } from './role/guards/role.guard'
import { MenuModule } from './menu/menu.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { RoleModule } from './role/role.module'
import { ArticleModule } from './article/article.module'
import { SearchModule } from './search/search.module'

@Module({
  imports: [
    MenuModule,
    AuthModule,
    UserModule,
    RoleModule,
    SearchModule,
    ArticleModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class ApiModule {}
