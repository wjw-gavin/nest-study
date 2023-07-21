import { Controller, Get, Param, Query, Req } from '@nestjs/common'
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
  getOptions(@Param('itemId') itemId: string) {
    return this.searchService.getOptions(itemId)
  }

  @Get('autocomplete/:itemId')
  getAutoComplete(
    @Param('itemId') itemId: string,
    @Query('keyword') keyword: string
  ) {
    return this.searchService.getAutoComplete(itemId, keyword)
  }
}
