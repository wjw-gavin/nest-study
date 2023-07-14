import { SearchItem } from '../modal/SearchItem'
import { EnumUtil } from '../../../enum/enumUtil'
import { SearchCondition } from '../modal/searchCondition'

export class RoleNameText extends SearchItem {
  public ENABLE = 'enable'
  public DISABLED = 'disabled'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOptions(searchCondition: SearchCondition) {
    return EnumUtil.getDisplayOptions(
      [this.ENABLE, this.DISABLED],
      'base_data',
      'status:'
    )
  }
}
