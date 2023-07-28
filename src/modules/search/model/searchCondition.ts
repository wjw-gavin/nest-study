import { TObject } from 'src/types'

export class SearchCondition {
  public static readonly RANGE_START = 'start'
  public static readonly RANGE_END = 'end'

  private condition: TObject

  private constructor(condition: TObject) {
    this.condition = condition
  }

  static instance(conditionJson?: string) {
    const condition = conditionJson ? JSON.parse(conditionJson) : {}
    return new SearchCondition(condition)
  }

  getItemIds() {
    return Object.keys(this.condition)
  }

  isItemSet(itemId: string) {
    return itemId in this.condition
  }

  getItemKey(itemId: string): any {
    let result = null
    if (this.condition[itemId]?.['key']) {
      result = this.condition[itemId]['key']
    } else if (this.condition[itemId]?.[0]?.['key']) {
      result = this.condition[itemId].map((item: TObject) => item['key'])
    }
    return result
  }

  getItemValue(itemId: string): any {
    let result = null
    if (this.condition[itemId]?.['value']) {
      result = this.condition[itemId]['value']
    } else if (this.condition[itemId]?.[0]?.['value']) {
      result = this.condition[itemId].map((item: TObject) => item['value'])
    }
    return result
  }

  getConditionJson(): string {
    return JSON.stringify(this.condition)
  }
}
