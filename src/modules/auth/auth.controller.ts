import {
  Get,
  Post,
  Body,
  Request,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../user/entities/user.entity'
import { Public } from './decorators/public.decorator'
import { UserInfoDto } from '../user/dto/user.dto'

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
  async getProfile(@Request() req: { user: UserInfoDto }) {
    // req.user 是在身份验证中设置的用户对象，它通常包含有关已认证用户的信息
    return req.user
  }
}
