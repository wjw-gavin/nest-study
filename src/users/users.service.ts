import { Injectable } from '@nestjs/common'

export interface User {
  userId?: number
  mobile: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      mobile: '18611111111',
      password: '123456'
    },
    {
      userId: 2,
      mobile: '18622222222',
      password: '123456'
    }
  ]

  async findOne(mobile: string): Promise<User | undefined> {
    return this.users.find((user) => user.mobile === mobile)
  }
}
