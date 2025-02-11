import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({ status: 201, description: 'Product added to cart' })
  @ApiResponse({ status: 400, description: 'Invalid product ID' })
  addToCart(@Request() req, @Body('productId') productId: string) {
    return this.cartService.addToCart(req.user.id, productId);
  }

  @Get()
  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart details' })
  getCart(@Request() req) {
    return this.cartService.getCart(req.user.id);
  }
}
