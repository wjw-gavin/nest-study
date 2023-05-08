import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { Cat } from './dto/cat.dto'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: Cat) {
    return await this.catsService.create(createCatDto)
  }

  @Get()
  async findAll() {
    return await this.catsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const cat = this.catsService.findOne(id)
    if (cat) {
      return cat
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: Cat) {
    return await this.catsService.update(id, updateCatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id)
  }
}
