import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../commons/guards/auth.guard'
import { RolesGuard } from '../commons/guards/role.guard'
import { MenuModule } from './menu/menu.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { RoleModule } from './role/role.module'
import { ArticleModule } from './article/article.module'
import { SearchModule } from './search/search.module'
import { FileModule } from './file/file.module'

@Module({
  imports: [
    MenuModule,
    AuthModule,
    UserModule,
    RoleModule,
    SearchModule,
    ArticleModule,
    FileModule
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
