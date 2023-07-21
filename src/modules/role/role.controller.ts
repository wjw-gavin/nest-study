import {
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { UserInfo } from 'src/commons/decorators/user.decorator'
import { PaginationPipe } from 'src/commons/pipes/pagination.pipe'
import { RoleService } from './role.service'
import { CreateRoleDto, ReqRoleListDto, UpdateRoleDto } from './dto/role.dto'
import { User } from '../user/entities/user.entity'

@Controller('role')
@UseInterceptors(ClassSerializerInterceptor)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @UserInfo() user: User) {
    createRoleDto.create_by = user.name
    return await this.roleService.create(createRoleDto)
  }

  @Get()
  async list(@Query(PaginationPipe) reqRoleListDto: ReqRoleListDto) {
    return await this.roleService.list(reqRoleListDto)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return await this.roleService.update(id, updateRoleDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.remove(id)
  }
}
