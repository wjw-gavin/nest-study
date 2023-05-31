import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { JWT } from 'src/commons/constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'mobile',
      secretOrKey: JWT.secret,
      // jwtFromRequest: ExtractJwt.fromHeader('X-Token')
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: any) {
    const user = {
      id: payload.id,
      name: payload.name,
      mobile: payload.mobile
    }
    return user
  }
}
