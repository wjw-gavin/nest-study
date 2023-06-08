import { Controller, Get } from '@nestjs/common'
import { MenuService } from './menu.service'
import { Menu } from './menu'

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  findAll(): Menu[] {
    return this.menuService.findAll()
  }
}
