import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(mobile: string, password: string) {
    const user = await this.usersService.findOneByMobile(mobile)
    if (user?.password !== password) {
      throw new UnauthorizedException('无权限登录！')
    }

    const payload = { 
      id: user.id, 
      name: user.name, 
      mobile: user.mobile 
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
