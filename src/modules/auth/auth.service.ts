import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(mobile: string, password: string) {
    const user = await this.userService.findOneByMobile(mobile)
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
