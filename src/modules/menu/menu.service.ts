import { Injectable } from '@nestjs/common'
import { menus } from './menu'

@Injectable()
export class MenuService {
  menus = menus

  findAll() {
    return this.menus
  }
}
