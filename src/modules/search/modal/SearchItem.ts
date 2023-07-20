/* eslint-disable @typescript-eslint/no-unused-vars */
import searchItems from 'src/resources/searchItems'
import { SearchCondition } from './searchCondition'
import { SearchItemConfigDto } from '../dto/search.dto'
import { ItemsUtil } from '../enum/itemsUtil'
import { transformStringToClassName } from 'src/commons/utils'

export class SearchItem {
  public function_name: string

  public static readonly OPTION_KEY = 'key'
  public static readonly OPTION_VALUE = 'value'

  protected static readonly TYPE_TEXT = 'text'
  protected static readonly TYPE_DATE = 'date'
  protected static readonly TYPE_TIME = 'time'
  protected static readonly TYPE_SELECT = 'select'
  protected static readonly TYPE_COMPLEX = 'complex'
  protected static readonly TYPE_DATE_RANGE = 'date_range'
  protected static readonly TYPE_TIME_RANGE = 'time_range'
  protected static readonly TYPE_AUTO_COMPLETE = 'auto_complete'

  protected id: string
  protected type: string
  protected userId: number
  protected children: string[] = []
  protected multiSelect = false

  private priorItemId: string

  constructor(searchItemId: string, userId: number) {
    this.id = searchItemId
    this.userId = userId
  }

  static instance(searchItemId: string, userId?: number): SearchItem {
    const className = transformStringToClassName(searchItemId)
    const item = new ItemsUtil(className)
    return item.instantiateDynamicClass(searchItemId, userId)
  }

  public getConfig(includeOptions = true) {
    const config: SearchItemConfigDto = {
      id: this.id,
      name: this.getDisplayName(),
      type: this.children.length === 0 ? this.type : SearchItem.TYPE_COMPLEX
    }

    if (config.type === SearchItem.TYPE_COMPLEX) {
      const childrenItems = []
      let priorItemId = ''
      for (const childItemId of this.children) {
        const childItem = SearchItem.instance(childItemId, this.userId)
        if (priorItemId !== '') {
          childItem.setPriorItemId(priorItemId)
        }
        childrenItems.push(childItem.getConfig())
        priorItemId = childItemId
      }
      config.children = childrenItems
    } else {
      config.hint = this.getDisplayHint()
      if (this.type === SearchItem.TYPE_SELECT) {
        config.multi_select = this.multiSelect
        if (includeOptions) {
          config.options = []
          config.options = this.getOptions(SearchCondition.instance(''))
        }
      }
    }

    return config
  }

  public getOptions(_searchCondition: SearchCondition): any[] {
    return []
  }

  public async getAutoComplete(
    _keyword: string,
    _searchCondition?: SearchCondition
  ): Promise<any[]> {
    return []
  }

  public getDisplayName() {
    const name = searchItems[this.id]
    if (name) {
      return name
    }
    throw new Error(`Search item missing ${this.id} name config`)
  }

  protected getDisplayHint() {
    const hint = searchItems[`hint_${this.id}`]
    if (hint) {
      return hint
    }
    throw new Error('Search item missing hint config')
  }

  protected getPriorItemId() {
    return this.priorItemId || ''
  }

  private setPriorItemId(priorItemId: string) {
    this.priorItemId = priorItemId
  }
}
