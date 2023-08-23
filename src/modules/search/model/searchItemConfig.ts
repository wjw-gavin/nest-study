import { listSearchItems } from '../resources/listSearchItem'
import { SearchItemConfigDto } from '../dto/search.dto'
import { SearchItem } from './searchItem'
export class SearchItemConfig {
  private id: string
  private userId: number

  private static readonly CONFIG = {
    user: [listSearchItems.user_name_text, listSearchItems.user_mobile],
    role: [listSearchItems.role_name_text, listSearchItems.role_status],
    article: [listSearchItems.article_name_text, listSearchItems.article_create_time]
  }

  constructor(searchItemConfigId: string, userId: number) {
    this.id = searchItemConfigId
    this.userId = userId
  }

  public static instance(searchItemConfigId: string, userId: number) {
    if (!(searchItemConfigId in SearchItemConfig.CONFIG)) {
      throw new Error(`${searchItemConfigId} 无效`)
    }
    return new SearchItemConfig(searchItemConfigId, userId)
  }

  public async getConfig() {
    const config: SearchItemConfigDto[] = []
    SearchItemConfig.CONFIG[this.id].forEach(async (searchItemId: string) => {
      const item = await SearchItem.instance(searchItemId, this.userId)
      config.push(await item.getConfig())
    })
    return config
  }
}
