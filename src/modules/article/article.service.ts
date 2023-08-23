import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Between, Like, Repository } from 'typeorm'
import { endOfDay, format } from 'date-fns'
import { UserInfoDto } from '../user/dto/user.dto'
import {
  CreateArticleDto,
  ReqArticleListDto,
  UpdateArticleDto
} from './dto/article.dto'
import { Article } from './entities/article.entity'
import { UserService } from '../user/user.service'
import { getDateRange } from '../../commons/utils'

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private readonly userService: UserService
  ) {}

  async create(user: UserInfoDto, createArticleDto: CreateArticleDto) {
    const author = await this.userService.findOne(user.id)
    const newArticle = this.articleRepository.create({
      ...createArticleDto,
      author
    })

    return await this.articleRepository.save(newArticle)
  }

  async findAll(reqArticleListDto: ReqArticleListDto) {
    const where: FindOptionsWhere<Article> = {}
    if (reqArticleListDto.article_name_text) {
      where.title = Like(`%${reqArticleListDto.article_name_text}%`)
    }

    const timeRange = reqArticleListDto.article_create_time
    if (timeRange) {
      const betweenDate = getDateRange(timeRange)
      where.create_time = Between(betweenDate[0], betweenDate[1])
    }

    const queryBuilde = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .where(where)

    if (reqArticleListDto.author_id) {
      queryBuilde.where('author.id = :id', { id: reqArticleListDto.author_id })
    }

    const [articles, total] = await queryBuilde
      .skip(reqArticleListDto.skip)
      .take(reqArticleListDto.take)
      .orderBy('article.create_time', 'DESC')
      .getManyAndCount()

    const data = articles.map((article) => {
      let author = null
      if (article.author) {
        author = {
          id: article.author.id,
          name: article.author.name
        }
      }
      return {
        ...article,
        author,
        create_time_display: format(article.create_time, 'yyyy-MM-dd HH:mm:ss'),
        update_time_display: format(article.update_time, 'yyyy-MM-dd HH:mm:ss')
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
