import { PartialType } from '@nestjs/mapped-types'

export class CreateArticleDto {
  readonly title: string
  readonly content: string
  readonly read_count: number
  readonly collect_count: number
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
