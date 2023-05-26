import { Controller, Post, Get, Body, Request, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { User } from '../users/entities/user.entity'
import { Public } from './decorators/public.decorator'
import { UserInfoDto } from 'src/users/dto/user-info.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Public()
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user.mobile, user.password)
  }

  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@Request() req: { user: UserInfoDto }) {
    // req.user 是在身份验证中设置的用户对象，它通常包含有关已认证用户的信息
    const { id } = req.user
    const user = await this.usersService.findOne(id)
    return user
  }
}
