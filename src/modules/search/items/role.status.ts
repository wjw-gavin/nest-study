import { SearchItem } from '../modal/SearchItem'
import { EnumUtil } from '../../../enum/enumUtil'
// import { SearchCondition } from '../modal/searchCondition'

export class RoleStatus extends SearchItem {
  protected $type = RoleStatus.TYPE_SELECT

  public ENABLE = 'enable'
  public DISABLED = 'disabled'

  getOptions() {
    return EnumUtil.getDisplayOptions(
      [this.ENABLE, this.DISABLED],
      'base_data',
      'status:'
    )
  }
}
