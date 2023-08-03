import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/commons/entities/base-entity'

@Entity()
export class FileInfo extends BaseEntity {
  @Column()
  originalName: string

  @Column()
  fileName: string

  @Column()
  path: string

  @Column()
  size: number
}
