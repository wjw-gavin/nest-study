import { Controller, Post, Get, Body, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from 'src/users/users.service'
import { Public } from './decorators/public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user.mobile, user.password)
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user
  }
}
