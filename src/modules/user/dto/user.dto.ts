import { PartialType } from '@nestjs/mapped-types'
import { PaginationDto } from 'src/commons/dto/pagination.dto'

export class CreateUserDto {
  mobile: string
  readonly sex: string
  readonly avatar: string
  readonly password: string
  readonly role_ids: number[]
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserInfoDto {
  readonly id: number
  readonly name: string
  readonly sex: string
  readonly avatar: string
  readonly mobile: string
}

/* 分页查询 */
export class ReqUserListDto extends PaginationDto {
  user_name_text?: string
  user_mobile?: string
}
