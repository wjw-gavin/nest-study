import { Column, Entity, ManyToMany } from 'typeorm'
import { User } from '../..//user/entities/user.entity'
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

  /* 角色状态（0 禁用，1 正常） */
  @Column({ type: 'enum', enum: ['enable', 'disabled'], default: 'enable' })
  status: string

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
