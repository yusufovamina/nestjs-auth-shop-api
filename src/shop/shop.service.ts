import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ShopService {
  private products: Product[] = [];

  findAll(): Product[] {
    return this.products;
  }
}