import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CatDocument = HydratedDocument<Cat>

@Schema()
export class Cat {
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
  transform: (doc, ret: CatDocument) => {
    delete ret._id
  }
})