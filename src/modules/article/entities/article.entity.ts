import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from 'src/commons/entities/base-entity'
import { User } from 'src/modules/user/entities/user.entity'

// @Entity('article')
@Entity()
export class Article extends BaseEntity {
  @Column({ length: 50 })
  title: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'int', default: 0 })
  read_count: number

  @Column({ type: 'int', default: 0 })
  collect_count: number

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'author_id' })
  author: User
}
