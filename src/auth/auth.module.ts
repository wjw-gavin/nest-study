import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
// import { LocalStrategy } from './local.strategy'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { JWT } from 'src/commons/constants'

@Module({
  imports: [UsersModule, JwtModule.register(JWT)],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
