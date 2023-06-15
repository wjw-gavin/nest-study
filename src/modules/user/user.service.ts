import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Like, Repository } from 'typeorm'
import { format } from 'date-fns'
import { RoleService } from '../role/role.service'
import { User } from './entities/user.entity'
import { CreateUserDto, ReqUserListDto, UpdateUserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly roleService: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByMobile(createUserDto.mobile)
    if (user) {
      throw new HttpException('用户已存在!', HttpStatus.BAD_REQUEST)
    }

    // 关联用户和角色
    const roles = await this.roleService.findListByIds(createUserDto.role_ids)
    const newUser = this.usersRepository.create({
      ...createUserDto,
      roles
    })
    return this.usersRepository.save(newUser)
  }

  async list(reqUserListDto: ReqUserListDto) {
    const where: FindOptionsWhere<User> = {}
    if (reqUserListDto.name) {
      where.name = Like(`%${reqUserListDto.name}%`)
    }
    if (reqUserListDto.mobile) {
      where.mobile = Like(`%${reqUserListDto.mobile}%`)
    }

    const [users, total] = await this.usersRepository.findAndCount({
      where,
      skip: reqUserListDto.skip,
      take: reqUserListDto.take,
      order: { create_time: 'DESC' },
      relations: ['roles']
    })

    const data = users.map((user) => ({
      ...user,
      roles: user.roles.map((role) => role.name).join(),
      create_time_display: format(user.create_time, 'yyyy-MM-dd HH:mm:ss'),
      update_time_display: format(user.update_time, 'yyyy-MM-dd HH:mm:ss')
    }))

    return { total, data }
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id })
  }

  async findOneByMobile(mobile: string) {
    // 由于密码字段使用了 select: false，这里使用 addSelect 来添加密码字段
    // 以便查询出的用户信息携带密码字段，用于 auth 中 login 验证密码等操作
    return await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne()
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    const roles = await this.roleService.findListByIds(updateUserDto.role_ids)

    const updateUser = {
      ...user,
      roles,
      ...updateUserDto
    }

    return await this.usersRepository.save(updateUser)
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id)
  }

  async getAutocompleteOptions(keyword: string) {
    const users = await this.usersRepository.find({
      where: {
        name: Like(`%${keyword}%`)
      }
    })

    return users.map((user) => {
      return {
        id: user.id,
        name: `${user.name}（${user.mobile}）`
      }
    })
  }
}
