import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  ParseIntPipe
} from '@nestjs/common'
import { format } from 'date-fns'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return {
      ...user,
      create_time_display: format(user.create_time, 'yyyy-MM-dd HH:mm:ss'),
      update_time: user.update_time
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return users.map((user) => ({
      ...user,
      create_time_display: format(user.create_time, 'yyyy-MM-dd HH:mm:ss'),
      update_time: user.update_time
    }))
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id)
  }
}
