import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { UserInfoDto } from 'src/users/dto/user.dto'
import { UsersService } from 'src/users/users.service'

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
      mobile: user.mobile
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async logout(user: UserInfoDto) {
    // 将 JWT 的过期时间设置为当前时间，使 JWT 失效
    const payload = { id: user.id }

    const token = this.jwtService.sign(payload, { expiresIn: 0 })
    console.log(token)
  }
}
