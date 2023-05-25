import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOneByMobile(createUserDto.mobile)
    if (user) {
      throw new HttpException('用户已存在!', HttpStatus.BAD_REQUEST)
    }
    return this.usersRepository.save(createUserDto)
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id })
  }

  async findOneByMobile(mobile: string): Promise<User> {
    const users = await this.findAll()
    return users.find((user) => user.mobile === mobile)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    await this.usersRepository.update(id, updateUserDto)
    return this.findOne(id)
  }

  async remove(id: number): Promise<any> {
    return await this.usersRepository.delete(id)
  }
}
