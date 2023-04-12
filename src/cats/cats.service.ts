import { Injectable } from '@nestjs/common';
import { Cat } from './dto/cat.dto'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
    // this.catModel.findOne({ _id: id }).exec()
    return this.catModel.findById(id).exec()
  }

  async update(id: string, updateCatDto: Cat): Promise<any> {
    return this.catModel.updateOne({ _id: id }, updateCatDto)
  }

  async remove(id: number): Promise<any> {
    // this.catModel.findByIdAndRemove({ _id: id }).exec()
    return this.catModel.deleteOne({ id }).exec()
  }
}
