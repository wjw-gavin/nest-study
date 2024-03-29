import { PartialType } from '@nestjs/mapped-types'
import { PaginationDto } from 'src/commons/dto/pagination.dto'
import { User } from 'src/modules/user/entities/user.entity'

export class CreateRoleDto {
  readonly name: string
  readonly desc: string
  readonly count: number
  readonly users: User[]
  readonly status: string
  public create_by: string
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

/* 分页查询 */
export class ReqRoleListDto extends PaginationDto {
  name?: string
  role_status?: string
}
