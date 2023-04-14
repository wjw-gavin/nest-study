import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Cat extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  sex: string

  @Prop()
  createTime: string

  @Prop()
  updateTime: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)

CatSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret: Cat) => {
    delete ret._id
  }
})
