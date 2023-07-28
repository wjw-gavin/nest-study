import { Reflector } from '@nestjs/core'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWT } from 'src/commons/constants'
import { IS_PUBLIC_KEY } from './decorators/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

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
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT.secret
      })

      // We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload
    } catch {
      throw new UnauthorizedException('token 无效')
    }
    return true
  }
}
