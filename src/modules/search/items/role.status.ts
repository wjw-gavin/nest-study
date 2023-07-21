import { SearchItem } from '../modal/searchItem'
import { EnumUtil } from './EnumUtil'

export class RoleStatus extends SearchItem {
  protected type = RoleStatus.TYPE_SELECT

  public ENABLE = 'enable'
  public DISABLED = 'disabled'

  getOptions() {
    return EnumUtil.getDisplayOptions(
      [this.ENABLE, this.DISABLED],
      'baseData',
      'role_status_'
    )
  }
}
