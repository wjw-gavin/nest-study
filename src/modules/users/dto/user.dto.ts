import { PartialType } from '@nestjs/mapped-types'

export class CreateUserDto {
  readonly mobile: string
  readonly password: string
  readonly sex: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserInfoDto {
  readonly id: number
  readonly name: string
  readonly sex: string
  readonly mobile: string
}
