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

    return {
      access_token: this.jwtService.sign(user)
    }
  }

  async logout(user: UserInfoDto) {
    // TODO: jwt 失效
    console.log(user)
  }
}
