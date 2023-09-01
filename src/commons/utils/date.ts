import { endOfDay, startOfDay } from 'date-fns'
import { Numeric } from 'src/types'

/**
 * @description: 使用 Between 例如查询 '2023-07-21' 至 '2023-07-23'，结果是21号0时0分0秒到23号0时0分0秒之间的数据，处理到23号23时59分59秒
 * @param date: 时间范围
 */
export const getDateRange = (date: Numeric[]) => {
  const result: Date[] = []
  result[0] = startOfDay(new Date(date[0]))
  result[1] = endOfDay(new Date(date[1]))

  return result
}
