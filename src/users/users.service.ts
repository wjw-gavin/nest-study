import { Injectable } from '@nestjs/common'

export interface User {
  userId?: number
  mobile: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users: User[]

  constructor() {
    this.users = [
      { userId: 1, mobile: '18811111111', password: '123456' },
      { userId: 2, mobile: '18822222222', password: '123456' },
      { userId: 3, mobile: '18833333333', password: '123456' }
    ]
  }

  async findOne(mobile: string): Promise<User | undefined> {
    return this.users.find((user) => user.mobile === mobile)
  }
}
