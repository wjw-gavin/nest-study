import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserInfoDto } from 'src/users/dto/user-info.dto'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.articleRepository.save(createArticleDto)
  }

  async findAll(user: UserInfoDto) {
    const articles =  await this.articleRepository.find()
    return articles.map(item => {
      return { 
        ...item, 
        author: user 
      }
    })
  }

  async findOne(id: number, user: UserInfoDto) {
    const article = await this.articleRepository.findOneBy({ id })
    return {
      ...article,
      author: user
    }
  }

 async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto)
    return await this.articleRepository.findOneBy({ id })
  }

  async remove(id: number) {
    await this.articleRepository.delete(id)
    return {}
  }
}
