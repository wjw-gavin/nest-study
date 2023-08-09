import { Reflector } from '@nestjs/core'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT } from '../constants'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { RedisService } from 'src/shared/redis/redis.service'
import { UserInfoDto } from 'src/modules/user/dto/user.dto'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private redisService: RedisService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = request.headers['x-token']
    if (!token) {
      throw new UnauthorizedException('缺少 token')
    }

    let payload: UserInfoDto = null
    try {
      payload = await this.jwtService.verifyAsync<UserInfoDto>(token, {
        secret: JWT.secret
      })
    } catch {
      throw new UnauthorizedException('token 无效')
    }

    const cacheToken = await this.redisService.get(
      `${payload.id}_${payload.mobile}`
    )
    if (!cacheToken) {
      throw new UnauthorizedException('token 不存在')
    }

    // We're assigning the payload to the request object here
    // so that we can access it in our route handlers
    request['user'] = payload

    return true
  }
}
