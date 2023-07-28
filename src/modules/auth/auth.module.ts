import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JWT } from 'src/commons/constants'
import { AuthGuard } from './auth.guard'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      ...JWT,
      signOptions: { expiresIn: '7d' }
    })
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
