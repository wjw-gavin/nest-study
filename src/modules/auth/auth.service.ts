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
      sex: user.sex,
      name: user.name,
      avatar: user.avatar,
      mobile: user.mobile
    }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async getProfile(id: number) {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new BadRequestException('用户不存在！')
    }

    return user
  }

  async logout(user: User) {
    // TODO: jwt 失效
    console.log(user)
  }
}
