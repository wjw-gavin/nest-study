import { Column, Entity, OneToMany, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Exclude } from 'class-transformer'
import { BaseEntity } from '../../commons/entities/base-entity'
import { Article } from 'src/articles/entities/article.entity'

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string

  @Column()
  mobile: string

  @Column()
  sex: string

  /**
   * 忽略字段，不返回前端
   * 记录：使用 Exclude 时未生效，使用 select: fase 生效
   * 使用 select: false 时，可以不添加 Exclude，这里是先放着
   * */
  @Exclude()
  @Column({ select: false })
  password: string

  @Column('enum', { enum: ['root', 'author', 'visitor'], default: 'visitor' })
  role: string

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[]

  @BeforeInsert()
  encryptPwd() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
  }
}
