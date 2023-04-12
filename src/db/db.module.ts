import { MongooseModule } from '@nestjs/mongoose'
import { dbConfig } from './config'

export const DBModule = MongooseModule.forRoot(dbConfig.URI)