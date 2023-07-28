import { SearchItem } from '../model/searchItem'
import { EnumUtil } from './enumUtil'

export class RoleStatus extends SearchItem {
  protected type = RoleStatus.TYPE_SELECT

  public ENABLE = 'enable'
  public DISABLED = 'disabled'

  async getOptions() {
    return EnumUtil.getDisplayOptions(
      [this.ENABLE, this.DISABLED],
      'baseData',
      'role_status_'
    )
  }
}
