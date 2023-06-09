import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserInfoDto } from '../users/dto/user.dto'
import {
  CreateArticleDto,
  ReqArticleListDto,
  UpdateArticleDto
} from './dto/article.dto'
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

  async findAll(user: UserInfoDto, reqArticleListDto: ReqArticleListDto) {
    const [articles, total] = await this.articleRepository.findAndCount({
      skip: reqArticleListDto.skip,
      take: reqArticleListDto.take,
      order: { create_time: 'DESC' }
    })

    const data = articles.map((item) => {
      return {
        ...item,
        author: user
      }
    })

    return { total, data }
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
