import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'

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

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn({
    type: 'timestamp'
  })
  create_time: Date

  @UpdateDateColumn({
    type: 'timestamp'
  })
  update_time: Date
}
