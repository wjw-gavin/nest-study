declare const module: any

import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { URL_PREFIX } from './commons/constants'
import { HttpExceptionFilter } from './commons/filters/http.exception.filter'
import { HttpSuccessInterceptor } from './commons/interceptors/http.success.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  app.setGlobalPrefix(URL_PREFIX)

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new HttpSuccessInterceptor())

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
