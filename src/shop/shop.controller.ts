import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Post()
  create(@Body() productDto: ProductDto) {
    // Создание товара
  }
}