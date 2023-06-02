export class PaginationDto {
  /* 当前页 */
  public page?: number

  /* 每页条数 */

  public pageSize?: number

  /* mysql 忽略条数 */
  public skip: number

  /* mysql 返回条数 */
  public take: number
}
