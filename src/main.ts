declare const module: any

import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { URL_PREFIX } from './commons/constants'
import { HttpExceptionFilter } from './commons/filters/http.exception.filter'
import { HttpSuccessInterceptor } from './commons/interceptors/http.success.interceptor'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'node:path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(cookieParser())

  app.setGlobalPrefix(URL_PREFIX)

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new HttpSuccessInterceptor())

  app.useStaticAssets(join(__dirname, '../resources/static'), {
    prefix: '/static' // eg: http://localhost:3000/static/...png
  })

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
