import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { JWT } from 'src/commons/constants'
import { User } from '../users/entities/user.entity'

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

  async validate(user: User) {
    return user
  }
}
