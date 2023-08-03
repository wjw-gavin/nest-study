import { UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { JWT, TOKEN } from '../constants'

export async function verifyCookieTokenAsync(req: Request) {
  const token = req.cookies[TOKEN]
  try {
    const jwtService = new JwtService()
    await jwtService.verifyAsync(token, {
      secret: JWT.secret
    })
    return true
  } catch {
    throw new UnauthorizedException('token 无效！')
  }
}
