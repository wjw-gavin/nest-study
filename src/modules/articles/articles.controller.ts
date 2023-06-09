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
import { ArticlesService } from './articles.service'
import { UserInfoDto } from '../users/dto/user.dto'
import { PaginationPipe } from 'src/commons/pipes/pagination.pipe'

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto)
  }

  @Get()
  async findAll(
    @Req() req: { user: UserInfoDto },
    @Query(PaginationPipe) reqArticleListDto: ReqArticleListDto
  ) {
    return this.articlesService.findAll(req.user, reqArticleListDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user: UserInfoDto }) {
    return this.articlesService.findOne(+id, req.user)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id)
  }
}
