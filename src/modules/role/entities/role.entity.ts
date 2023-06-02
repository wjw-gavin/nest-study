import { Column, Entity, ManyToMany } from 'typeorm'
import { User } from '../..//users/entities/user.entity'
import { BaseEntity } from 'src/commons/entities/base-entity'

@Entity()
export class Role extends BaseEntity {
  /* 角色名称 */
  @Column()
  name: string

  /* 角色描述 */
  @Column()
  desc: string

  /* 创建者 name */
  @Column()
  create_by: string

  /* 角色下有多少用户 */
  @Column()
  count: number

  /* 角色状态（0 禁用，1 正常） */
  @Column({ type: 'enum', enum: [0, 1], default: 1 })
  status: number

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
