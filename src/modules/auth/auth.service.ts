import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(mobile: string, password: string) {
    const user = await this.usersService.findOneByMobile(mobile)
    if (!user) {
      throw new BadRequestException('用户不存在！')
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！')
    }

    const payload = {
      id: user.id,
      name: user.name,
      sex: user.sex,
      mobile: user.mobile
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async logout(user: User) {
    // TODO: jwt 失效
    console.log(user)
  }
}
