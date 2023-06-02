import { Injectable, PipeTransform } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'

@Injectable()
export class UserInfoByIdPipe implements PipeTransform<any> {
  constructor(private readonly userService: UsersService) {}
  async transform(value: string) {
    console.log(value)
    const user = await this.userService.findOne(+value)
    if (user) {
      return user
    }
  }
}
