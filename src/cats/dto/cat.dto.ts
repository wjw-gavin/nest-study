import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
@Schema()
export class Cat extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  sex: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)

CatSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret: Cat) => {
    delete ret._id
  }
})
