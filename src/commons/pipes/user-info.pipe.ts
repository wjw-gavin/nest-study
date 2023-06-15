import { Injectable, PipeTransform } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class UserInfoByIdPipe implements PipeTransform<any> {
  constructor(private readonly userService: UserService) {}
  async transform(value: string) {
    console.log(value)
    const user = await this.userService.findOne(+value)
    if (user) {
      return user
    }
  }
}
