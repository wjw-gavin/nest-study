import { Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { SearchItem } from './model/searchItem'
import { SearchItemConfig } from './model/searchItemConfig'
import services from 'src/shared/services'

@Injectable()
export class SearchService {
  constructor(private readonly moduleRef: ModuleRef) {}

  private getServiceName(itemId: string) {
    const module = itemId.split('_')[0]
    return module.charAt(0).toUpperCase() + module.slice(1) + 'Service'
  }

  async getConfig(configId: string, userId: number) {
    const item = SearchItemConfig.instance(configId, userId)
    return await item.getConfig()
  }

  async getOptions(itemId: string) {
    const item = await SearchItem.instance(itemId)
    const serviceName = this.getServiceName(itemId)
    const service = this.moduleRef.get(services[serviceName], {
      strict: false
    })
    return await service[item.function_name]()
  }

  async getAutoComplete(itemId: string, keyword = '') {
    const item = await SearchItem.instance(itemId)
    const serviceName = this.getServiceName(itemId)
    const service = this.moduleRef.get(services[serviceName], {
      strict: false
    })
    return await service[item.function_name](keyword)
  }
}
