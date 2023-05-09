import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto)
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec()
  }

  async findOneByMobile(mobile: string): Promise<User> {
    const users = await this.userModel.find().exec()
    return users.find((user) => user.mobile === mobile)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        returnDocument: 'after'
      })
      .exec()
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
