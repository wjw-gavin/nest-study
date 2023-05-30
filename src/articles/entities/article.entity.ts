import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn
} from 'typeorm'
import { User } from 'src/users/entities/user.entity'

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number

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

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date
}
