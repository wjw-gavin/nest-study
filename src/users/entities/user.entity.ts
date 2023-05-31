import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
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

  /**
   * 记录：使用 Exclude 时未生效，使用 select: fase 生效
   * 使用 select: false 时，可以不添加 Exclude，这里是先放着
   * */
  // 忽略字段，不返回前端
  @Exclude()
  @Column({ select: false })
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

  @BeforeInsert()
  encryptPwd() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
  }
}
