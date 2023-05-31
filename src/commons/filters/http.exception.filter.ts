import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  errMsg = ''

  constructor(message?: string) {
    this.errMsg = message
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = exception.getStatus()
    const message = exception.message

    response.status(status).json({
      data: null,
      status: {
        code: status,
        message: this.errMsg || message,
        path: request.url,
        timestamp: new Date().toISOString()
      }
    })
  }
}
