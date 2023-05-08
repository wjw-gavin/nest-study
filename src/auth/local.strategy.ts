import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // 如果不传配置项，默认字段 username
    super({
      usernameField: 'mobile'
    })
  }

  async validate(mobile: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(mobile, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
