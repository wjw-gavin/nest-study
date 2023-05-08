// import { format } from 'date-fns'
import { Model } from 'mongoose'
import { Cat } from './dto/cat.dto'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<Cat>) {}

  async create(createCatDto: Cat): Promise<Cat> {
    return this.catModel.create(createCatDto)
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec()
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findById(id).exec()
  }

  async update(id: string, updateCatDto: Cat): Promise<any> {
    return this.catModel
      .findByIdAndUpdate(id, updateCatDto, {
        returnDocument: 'after'
      })
      .exec()
  }

  async remove(id: string): Promise<any> {
    return this.catModel.findByIdAndDelete(id).exec()
  }
}
