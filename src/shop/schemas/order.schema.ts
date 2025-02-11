import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Product } from './product.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop({ required: true, type: Number })
  totalPrice: number;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
