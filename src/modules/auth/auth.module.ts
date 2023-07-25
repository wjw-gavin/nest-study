import { APP_GUARD } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { JWT } from 'src/commons/constants'
import { JwtAuthGuard } from './jwt-auth.guard'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      ...JWT,
      signOptions: { expiresIn: '7d' }
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
