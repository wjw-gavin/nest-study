import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { UserService } from '../user/user.service'
import { RedisService } from 'src/shared/redis/redis.service'
import { UserInfoDto } from '../user/dto/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly redisService: RedisService
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
    const token = this.jwtService.sign(payload)

    await this.redisService.set(`${user.id}_${user.mobile}`, token)

    return {
      token: token
    }
  }

  async getProfile(id: number) {
    const user = await this.userService.findOne(id)
    if (!user) {
      throw new BadRequestException('用户不存在！')
    }

    return user
  }

  async logout(user: UserInfoDto) {
    await this.redisService.del(`${user.id}_${user.mobile}`)

    return { message: '退出登录' }
  }
}
