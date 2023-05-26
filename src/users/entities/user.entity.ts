import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { Article } from 'src/articles/entities/article.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  mobile: string

  @Column()
  sex: string

  // 忽略字段，不返回前端
  @Exclude()
  @Column()
  password: string

  @Column('enum', { enum: ['root', 'author', 'visitor'], default: 'visitor' })
  role: string

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[]

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date

  @UpdateDateColumn({ type: 'timestamp' })
  update_time: Date
}
