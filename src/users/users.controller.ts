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
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    return await this.usersService.findAll(page, pageSize)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id)
    return []
  }
}
