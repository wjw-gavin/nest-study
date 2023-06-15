import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query
} from '@nestjs/common'
import {
  CreateArticleDto,
  ReqArticleListDto,
  UpdateArticleDto
} from './dto/article.dto'
import { ArticleService } from './article.service'
import { UserInfoDto } from '../users/dto/user.dto'
import { PaginationPipe } from 'src/commons/pipes/pagination.pipe'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(
    @Req() req: { user: UserInfoDto },
    @Body() createArticleDto: CreateArticleDto
  ) {
    return this.articleService.create(req.user, createArticleDto)
  }

  @Get()
  async findAll(@Query(PaginationPipe) reqArticleListDto: ReqArticleListDto) {
    return this.articleService.findAll(reqArticleListDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user: UserInfoDto }) {
    return this.articleService.findOne(+id, req.user)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}
