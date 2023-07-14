import { Injectable } from '@nestjs/common'
import { SearchItem } from './modal/searchItem'
import { SearchCondition } from './modal/searchCondition'
import { SearchItemConfig } from './modal/searchItemConfig'

@Injectable()
export class SearchService {
  getConfig(configId: string, userId: number) {
    const item = SearchItemConfig.instance(configId, userId)
    return item.getConfig()
  }

  getOptions(itemId: string, userId: number) {
    const item = SearchItem.instance(itemId, userId)
    // TODO: condition 处理
    // const searchCondition = SearchCondition.instance(condition || '')
    const searchCondition = SearchCondition.instance('')
    const options = item.getOptions(searchCondition)
    return options
  }

  getAutoComplete(itemId: string, keyword = '', userId: number) {
    const item = SearchItem.instance(itemId, userId)
    const searchCondition = SearchCondition.instance('')
    const autoCompleteOptions = item.getAutoComplete(keyword, searchCondition)
    return autoCompleteOptions
  }
}
