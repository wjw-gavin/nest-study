import { TypeOrmModule } from '@nestjs/typeorm'
import { dbConfig } from './config'

export const DBModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: 'test',
  autoLoadEntities: true,
  synchronize: true
})
