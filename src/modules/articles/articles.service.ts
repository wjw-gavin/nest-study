import { Injectable } from '@nestjs/common'
import { FindOptionsWhere, Like, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserInfoDto } from '../users/dto/user.dto'
import {
  CreateArticleDto,
  ReqArticleListDto,
  UpdateArticleDto
} from './dto/article.dto'
import { Article } from './entities/article.entity'
import { format } from 'date-fns'
import { UsersService } from '../users/users.service'

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private readonly usersService: UsersService
  ) {}

  async create(user: UserInfoDto, createArticleDto: CreateArticleDto) {
    const author = await this.usersService.findOne(user.id)
    const newArticle = this.articleRepository.create({
      ...createArticleDto,
      author
    })

    return await this.articleRepository.save(newArticle)
  }

  async findAll(reqArticleListDto: ReqArticleListDto) {
    const where: FindOptionsWhere<Article> = {}
    if (reqArticleListDto.title) {
      where.title = Like(`%${reqArticleListDto.title}%`)
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
        create_time_display: format(article.create_time, 'yyyy-MM-dd HH:mm:ss')
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
