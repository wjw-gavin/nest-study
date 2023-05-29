import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { format } from 'date-fns'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByMobile(createUserDto.mobile)
    if (user) {
      throw new HttpException('用户已存在!', HttpStatus.BAD_REQUEST)
    }
    return this.usersRepository.save(createUserDto)
  }

  async findAll(page: number, pageSize: number) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { create_time: 'DESC' }
    })

    const data = users.map((user) => ({
      ...user,
      create_time_display: format(user.create_time, 'yyyy-MM-dd HH:mm:ss'),
      update_time_display: format(user.update_time, 'yyyy-MM-dd HH:mm:ss')
    }))

    return { total, data }
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id })
  }

  async findOneByMobile(mobile: string) {
    return await this.usersRepository.findOneBy({ mobile })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id)
  }
}
