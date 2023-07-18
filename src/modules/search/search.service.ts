import { Injectable } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
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
    const service = this.moduleRef.get(services[itemId], {
      strict: false
    })
    return await service.getOptions()
  }

  async getAutoComplete(itemId: string, keyword = '') {
    const serviceName = this.getServiceName(itemId)
    const service = this.moduleRef.get(services[serviceName], {
      strict: false
    })
    return await service.getAutoComplete(keyword)
  }
}
