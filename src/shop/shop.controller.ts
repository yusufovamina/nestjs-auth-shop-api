import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ProductDto } from './dto/product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'List of all products' })
  findAll(@Query('category') category?: string) {
    return this.shopService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single product' })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.shopService.findOne(id);
  }

  @Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
@ApiOperation({ summary: 'Add a new product (Admin only)' })
@ApiResponse({ status: 201, description: 'Product created' })
@ApiResponse({ status: 403, description: 'Forbidden' })
async create(@Body() productDto: ProductDto) {
  console.log('Received productDto:', productDto); // Лог входных данных
  return this.shopService.create(productDto);
}


  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product details (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.shopService.update(id, productDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  delete(@Param('id') id: string) {
    return this.shopService.delete(id);
  }
}
