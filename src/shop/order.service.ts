import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
  ) {}

  async createOrder(userId: string): Promise<Order> {
    const cart = await this.cartModel.findOne({ user: userId }).populate('products').exec();
    if (!cart || cart.products.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const totalPrice = cart.products.reduce((sum, product) => sum + product.price, 0);

    const order = new this.orderModel({
      user: userId,
      products: cart.products,
      totalPrice,
    });

    await order.save();
    await this.cartModel.deleteOne({ user: userId });

    return order;
  }

  async getOrders(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId }).populate('products').exec();
  }
}
