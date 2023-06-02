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
import { ArticlesService } from './articles.service'
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto'
import { UserInfoDto } from '../users/dto/user.dto'

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
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10
  ) {
    return this.articlesService.findAll(req.user, page, pageSize)
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
