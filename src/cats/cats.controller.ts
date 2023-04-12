import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './dto/cat.dto'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: Cat) {
    console.log(createCatDto)
    
    return await this.catsService.create(createCatDto)
  }

  @Get()
  findAll() {
    return this.catsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: Cat) {
    return this.catsService.update(id, updateCatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id)
  }
}
