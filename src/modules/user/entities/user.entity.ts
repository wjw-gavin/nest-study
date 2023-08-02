import {
  Column,
  Entity,
  OneToMany,
  BeforeInsert,
  JoinTable,
  ManyToMany
} from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { BaseEntity } from 'src/commons/entities/base-entity'
import { Article } from '../../article/entities/article.entity'
import { Role } from 'src/modules/role/entities/role.entity'

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string

  @Column()
  mobile: string

  @Column()
  sex: string

  @Column({ select: false })
  password: string

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable({
    name: 'user_roles', // <-- 指定表名
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
  })
  roles: Role[]

  @OneToMany(() => Article, (article) => article.author)
  @JoinTable()
  articles: Article[]

  @BeforeInsert()
  encryptPwd() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
  }
}
