import { SearchItem } from '../model/searchItem'

export class RoleOption extends SearchItem {
  public function_name = 'getRoleOptions'

  protected type = RoleOption.TYPE_SELECT
}
