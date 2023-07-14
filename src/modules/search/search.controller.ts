import { Controller, Get, Param, Req } from '@nestjs/common'
import { SearchService } from './search.service'
import { UserInfoDto } from '../user/dto/user.dto'

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('config/:configId')
  getConfig(
    @Req() req: { user: UserInfoDto },
    @Param('configId') configId: string
  ) {
    return this.searchService.getConfig(configId, req.user.id)
  }

  @Get('option/:itemId')
  getOptions(
    @Req() req: { user: UserInfoDto },
    @Param('configId') itemId: string
  ) {
    return this.searchService.getOptions(itemId, req.user.id)
  }

  @Get('autocomplete/:itemId')
  getAutoComplete(
    @Req() req: { user: UserInfoDto },
    @Param('itemId') itemId: string,
    @Param('keyword') keyword: string
  ) {
    return this.searchService.getAutoComplete(itemId, keyword, req.user.id)
  }
}
