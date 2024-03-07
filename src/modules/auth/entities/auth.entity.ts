import { Column, Entity, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { BaseEntity } from 'src/commons/entities/base-entity'

@Entity()
export class RegisterUser extends BaseEntity {
  @Column()
  mobile: string

  @Column()
  password: string

  @BeforeInsert()
  encryptPwd() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
  }
}
