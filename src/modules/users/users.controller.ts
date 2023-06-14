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
import { CreateUserDto, ReqUserListDto, UpdateUserDto } from './dto/user.dto'
import { PaginationPipe } from 'src/commons/pipes/pagination.pipe'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findAll(@Query(PaginationPipe) reqUserListDto: ReqUserListDto) {
    return await this.usersService.list(reqUserListDto)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id)
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

  @Get('autocomplete/options')
  async getAutocompleteOptions(@Query('keyword') keyword: string) {
    return await this.usersService.getAutocompleteOptions(keyword)
  }
}
