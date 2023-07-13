import { Module } from '@nestjs/common'
import { DBModule } from './db/db.module'
import { ApiModule } from './modules/api.module'

@Module({
  imports: [DBModule, ApiModule],
  controllers: [],
  providers: []
})
export class AppModule {}
