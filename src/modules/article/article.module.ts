import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { ArticleService } from './article.service'
import { Article } from './entities/article.entity'
import { ArticleController } from './article.controller'

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
