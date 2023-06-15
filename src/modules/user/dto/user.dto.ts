import { PartialType } from '@nestjs/mapped-types'
import { PaginationDto } from 'src/commons/dto/pagination.dto'

export class CreateUserDto {
  readonly mobile: string
  readonly password: string
  readonly sex: string
  readonly role_ids: number[]
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserInfoDto {
  readonly id: number
  readonly name: string
  readonly sex: string
  readonly mobile: string
}

/* 分页查询 */
export class ReqUserListDto extends PaginationDto {
  name?: string
  mobile?: string
}
