import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Response<T> {
  data: T
}

@Injectable()
export class HttpSuccessInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        status: {
          code: 0,
          message: 'success'
        }
      }))
    )
  }
}
