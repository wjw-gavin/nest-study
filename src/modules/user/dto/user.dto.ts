import { PartialType } from '@nestjs/mapped-types'
import { PaginationDto } from 'src/commons/dto/pagination.dto'

export class CreateUserDto {
  sex: string
  avatar: string
  mobile: string
  role_ids: number[]
  password: string
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
