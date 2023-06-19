import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, In, Like, Repository } from 'typeorm'
import { format } from 'date-fns'
import { CreateRoleDto, UpdateRoleDto, ReqRoleListDto } from './dto/role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  // 新增
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.findOneByName(createRoleDto.name)
    if (role) {
      throw new BadRequestException('角色已存在!')
    }
    return this.roleRepository.save(createRoleDto)
  }

  async findOneByName(name: string) {
    return await this.roleRepository.findOneBy({ name })
  }

  /* 分页查询 */
  async list(reqRoleListDto: ReqRoleListDto) {
    const where: FindOptionsWhere<Role> = {}
    if (reqRoleListDto.name) {
      where.name = Like(`%${reqRoleListDto.name}%`)
    }
    if (reqRoleListDto.status) {
      where.status = reqRoleListDto.status
    }
    // TODO: 搜索时间范围可以使用 Between
    const [roles, total] = await this.roleRepository.findAndCount({
      where,
      skip: reqRoleListDto.skip,
      take: reqRoleListDto.take,
      relations: ['users']
      // select: ['id', 'name', 'status', 'desc', 'create_time', 'update_time'] // 指定返回字段
    })

    const data = roles.map((role) => {
      const count = role.users.length
      delete role.users
      return {
        ...role,
        count,
        status_display: role.status === 1 ? '启用' : '禁用',
        create_time_display: format(role.create_time, 'yyyy-MM-dd HH:mm:ss'),
        update_time_display: format(role.update_time, 'yyyy-MM-dd HH:mm:ss')
      }
    })

    return { total, data }
  }

  /* 通过 id 查询 */
  async findOne(id: number) {
    return this.roleRepository.findOneBy({ id })
  }

  /* 通过 id 数组查询 */
  async findListByIds(ids: number[]) {
    const roles = await this.roleRepository.find({
      where: {
        id: In(ids)
      }
    })
    return roles
  }

  /* 通过 id 更新 */
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto)
    return this.findOne(id)
    // return await this.roleRepository
    //   .createQueryBuilder()
    //   .update(UpdateRoleDto)
    //   .set(updateRoleDto)
    //   .where({ id })
    //   .execute()
  }

  /* 通过id删除 */
  async remove(id: number) {
    return await this.roleRepository.delete(id)
  }

  async getDefaultOptions() {
    const roles = await this.roleRepository.find()

    return roles.map((role) => {
      return {
        id: role.id,
        name: `${role.name}`
      }
    })
  }
}
