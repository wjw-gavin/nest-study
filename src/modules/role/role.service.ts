import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Like, Repository } from 'typeorm'
import { CreateRoleDto, UpdateRoleDto, ReqRoleListDto } from './dto/role.dto'
import { Role } from './entities/role.entity'
import { format } from 'date-fns'

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
      order: { create_time: 'DESC' },
      select: ['id', 'create_time', 'status', 'desc']
    })

    const data = roles.map((role) => ({
      ...role,
      status_display: role.status === 0 ? '启用' : '禁用',
      create_time_display: format(role.create_time, 'yyyy-MM-dd HH:mm:ss'),
      update_time_display: format(role.update_time, 'yyyy-MM-dd HH:mm:ss')
    }))

    return { total, data }
  }

  /* 通过 id 查询 */
  async findOne(id: number) {
    return this.roleRepository.findOneBy({ id })
  }

  /* 通过 id 更新 */
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepository.update(id, updateRoleDto)
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
}
