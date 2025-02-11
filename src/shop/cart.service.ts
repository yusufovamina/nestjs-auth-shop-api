import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async addToCart(userId: string, productId: string): Promise<Cart> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cart = await this.cartModel.findOne({ user: userId }).exec();
    if (!cart) {
      cart = new this.cartModel({ user: userId, products: [] });
    }

    cart.products.push(product);
    return cart.save();
  }

  async getCart(userId: string): Promise<Cart | null> {
    const cart = await this.cartModel.findOne({ user: userId }).populate('products').exec();
    if (!cart) {
      throw new NotFoundException('Cart is empty');
    }
    return cart;
  }
  
}
