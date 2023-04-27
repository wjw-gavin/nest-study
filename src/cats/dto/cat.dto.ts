import { format } from 'date-fns'
import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: { createdAt: 'create_time', updatedAt: 'update_time' } })
export class Cat extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  sex: string

  @Prop()
  create_time: Date

  @Prop()
  update_time: Date

  @Prop()
  create_time_display: string

  @Prop()
  update_time_display: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)

CatSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: Cat) => {
    // 格式化时间以便前端展示
    ret.create_time_display = format(
      new Date(ret.create_time),
      'yyyy-MM-dd HH:mm:ss'
    )
    ret.update_time_display = format(
      new Date(ret.update_time),
      'yyyy-MM-dd HH:mm:ss'
    )

    delete ret._id
  }
})
