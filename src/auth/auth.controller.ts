import { Controller, Post, Get, Body, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import { User } from '../users/schemas/user.schema'
import { Public } from './decorators/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Public()
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user.mobile, user.password)
  }

  @Get('profile')
  async getProfile(@Request() req: any) {
    const { userId } = req.user
    const user = await this.usersService.findOne(userId)
    return user
  }
}
