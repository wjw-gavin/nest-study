import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { JWT } from 'src/commons/constants'
import { UserInfoDto } from '../user/dto/user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'mobile',
      secretOrKey: JWT.secret,
      // 前端传入 'X-TOKEN'，这里要小写，不然获取不到
      jwtFromRequest: ExtractJwt.fromHeader('x-token')
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(user: UserInfoDto) {
    return user
  }
}
