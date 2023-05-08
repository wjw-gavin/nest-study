import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User, UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  async validateUser(mobile: string, pass: string): Promise<any> {
    console.log('user')
    const user = await this.usersService.findOne(mobile)

    if (user?.password === pass) {
      const result = Object.assign({}, user)

      delete result.password
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.mobile, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
