import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  ClassSerializerInterceptor,
  UseInterceptors
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../users/entities/user.entity'
import { Public } from './decorators/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user.mobile, user.password)
  }

  @Post('logout')
  async logout(@Request() req: { user: User }) {
    await this.authService.logout(req.user)
  }

  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@Request() req: { user: User }) {
    // req.user 是在身份验证中设置的用户对象，它通常包含有关已认证用户的信息
    return req.user
  }
}
