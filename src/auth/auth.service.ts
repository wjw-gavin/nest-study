import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // async validateUser(mobile: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOneByMobile(mobile)
  //   if (user?.password === password) {
  //     const result = Object.assign({}, user)

  //     delete result.password
  //     return result
  //   }
  //   return null
  // }

  async login(mobile: string, password: string) {
    const user = await this.usersService.findOneByMobile(mobile)
    if (user?.password !== password) {
      throw new NotFoundException('用户不存在')
    }

    const payload = { mobile: user.mobile, userId: user.id }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
