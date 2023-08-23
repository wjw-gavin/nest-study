import { PartialType } from '@nestjs/mapped-types'
import { PaginationDto } from 'src/commons/dto/pagination.dto'

export class CreateArticleDto {
  readonly title: string
  readonly content: string
  readonly read_count: number
  readonly collect_count: number
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class ReqArticleListDto extends PaginationDto {
  author_id?: number
  article_name_text?: string
  article_create_time?: string[]
}
