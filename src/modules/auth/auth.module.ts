import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JWT } from 'src/commons/constants'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      ...JWT,
      signOptions: { expiresIn: '7d' }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
