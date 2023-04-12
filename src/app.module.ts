import { Module } from '@nestjs/common'
import { DBModule } from './db/db.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'

@Module({
  imports: [DBModule, CatsModule],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
