import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order' })
  @ApiResponse({ status: 201, description: 'Order successfully placed' })
  @ApiResponse({ status: 400, description: 'Cart is empty' })
  createOrder(@Request() req) {
    return this.orderService.createOrder(req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({ status: 200, description: 'List of user orders' })
  getOrders(@Request() req) {
    return this.orderService.getOrders(req.user.id);
  }
}
