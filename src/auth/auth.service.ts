import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async validateUser(mobile: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(mobile)
    if (user?.password === password) {
      const payload = { mobile: user.mobile, userId: user.userId }
      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    }

    throw new UnauthorizedException()
  }
}
