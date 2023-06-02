import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// 从 token 中 获取用户信息
export const UserInfo = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user
  return user
})
