import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticlesService } from './articles.service'
import { ArticlesController } from './articles.controller'
import { Article } from './entities/article.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
