import { Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
// TODO: 这里直接引入 searchItem 会报错，但是重新创建一个一模一样的文件（searchService）就好了，待排查问题所在
// import { SearchItem } from './modal/searchItem'
import { SearchItem } from './modal/searchService'
import { SearchItemConfig } from './modal/searchItemConfig'
import services from 'src/shared/services'

@Injectable()
export class SearchService {
  constructor(private readonly moduleRef: ModuleRef) {}

  private getServiceName(itemId: string) {
    const module = itemId.split('_')[0]
    return module.charAt(0).toUpperCase() + module.slice(1) + 'Service'
  }

  getConfig(configId: string, userId: number) {
    const item = SearchItemConfig.instance(configId, userId)
    return item.getConfig()
  }

  async getOptions(itemId: string) {
    const item = SearchItem.instance(itemId)
    const serviceName = this.getServiceName(itemId)
    const service = this.moduleRef.get(services[serviceName], {
      strict: false
    })
    return await service[item.function_name]()
  }

  async getAutoComplete(itemId: string, keyword = '') {
    const item = SearchItem.instance(itemId)
    const serviceName = this.getServiceName(itemId)
    const service = this.moduleRef.get(services[serviceName], {
      strict: false
    })
    return await service[item.function_name](keyword)
  }
}
