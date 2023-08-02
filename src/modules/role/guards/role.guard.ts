import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from 'src/modules/user/user.service'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<number[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )
    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const userId = request.user.id // 请求中 token 带的用户信息
    const user = await this.userService.findOne(userId)

    const result = requiredRoles.some((roleId) =>
      user.role_ids.includes(roleId)
    )
    if (!result) {
      throw new ForbiddenException('无权限操作！')
    }

    return true
  }
}
