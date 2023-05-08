import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from 'src/users/users.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User): Promise<any> {
    return this.authService.validateUser(user.mobile, user.password)
  }
}
