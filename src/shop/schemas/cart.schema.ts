import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Product } from './product.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
