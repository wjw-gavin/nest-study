import {
  BadRequestException,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
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
    private userRepository: Repository<User>,
    private readonly roleService: RoleService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByMobile(createUserDto.mobile)
    if (user) {
      throw new BadRequestException('用户已存在!')
    }

    // 关联用户和角色
    const roles = await this.roleService.findListByIds(createUserDto.role_ids)
    const newUser = this.userRepository.create({
      ...createUserDto,
      roles
    })

    return await this.userRepository.save(newUser)
  }

  async list(reqUserListDto: ReqUserListDto) {
    const where: FindOptionsWhere<User> = {}
    if (reqUserListDto.user_name_text) {
      where.name = Like(`%${reqUserListDto.user_name_text}%`)
    }
    if (reqUserListDto.user_mobile) {
      where.mobile = Like(`%${reqUserListDto.user_mobile}%`)
    }

    const [users, total] = await this.userRepository.findAndCount({
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
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id = :id', { id: id })
      .getOne()

    const roleIds = user.roles.map((role) => role.id)
    delete user.roles
    return { ...user, role_ids: roleIds }
  }

  async findOneByMobile(mobile: string) {
    // 由于密码字段使用了 select: false，这里使用 addSelect 来添加密码字段
    // 用于 auth 中 login 接口验证密码是否相同
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne()
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    const roles = await this.roleService.findListByIds(updateUserDto.role_ids)

    // 手机号、密码不允许修改
    delete updateUserDto.mobile
    delete updateUserDto.password
    Object.assign(user, updateUserDto)
    const updateUser = {
      ...user,
      roles
    }

    await this.userRepository.save(updateUser)
  }

  async remove(id: number) {
    // 2 指的是管理员的 id
    if (id === 2) {
      throw new ForbiddenException('管理员不允许删除！')
    }
    return await this.userRepository.delete(id)
  }

  async getUserOptionsByMobile(keyword: string) {
    const users = await this.userRepository.find({
      where: {
        mobile: Like(`%${keyword}%`)
      }
    })

    return users.map((user) => {
      return {
        key: user.id,
        value: `${user.name}（${user.mobile}）`
      }
    })
  }
}
