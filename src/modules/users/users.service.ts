import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { format } from 'date-fns'
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
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

    const newUser = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(newUser)
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
    // 由于密码字段使用了 select: false，这里使用 addSelect 来添加密码字段
    // 以便查询出的用户信息携带密码字段，用于验证等操作
    return await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne()
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id)
  }
}
