import type { TObject } from 'src/types'
import baseData from '../resources/baseData'
import { SearchItemOption } from 'src/modules/search/dto/search.dto'

export class EnumUtil {
  static getDisplayOptions(
    constants: string[],
    resourceFileName: string,
    languageKeyPrefix: string
  ) {
    const displayOptions: SearchItemOption[] = []

    // console.log(resourceFileName)
    // TODO: 实现动态获取指定文件数据源

    for (const key of constants) {
      displayOptions.push({
        key: key,
        value: baseData[languageKeyPrefix + key]
      })
    }

    return displayOptions
  }

  static replaceIdWithLabelInRow(row: TObject, keyEnumMap: TObject): TObject {
    if (row) {
      for (const key of Object.keys(keyEnumMap)) {
        if (row[key]) {
          row[key] = keyEnumMap[key].getLabel(row[key])
        }
      }
    }
    return row
  }

  static replaceIdWithLabelInRows(rows: TObject, keyEnumMap: TObject): TObject {
    for (const id in rows) {
      rows[id] = EnumUtil.replaceIdWithLabelInRow(rows[id], keyEnumMap)
    }
    return rows
  }
}
