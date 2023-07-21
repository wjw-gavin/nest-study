import { SearchItem } from '../modal/searchItem'

export class UserMobile extends SearchItem {
  public function_name = 'getUserOptionsByMobile'

  protected type = UserMobile.TYPE_AUTO_COMPLETE
}
