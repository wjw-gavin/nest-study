import { PipeTransform, Injectable } from '@nestjs/common'
import { PaginationDto } from '../dto/pagination.dto'

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: PaginationDto) {
    const skip = value.page ? (value.page - 1) * value.pageSize : 0
    const take = value.pageSize ?? 0
    value.skip = skip
    value.take = take
    return value
  }
}
