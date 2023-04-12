import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string

  @Prop()
  age: number

  @Prop()
  sex: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)