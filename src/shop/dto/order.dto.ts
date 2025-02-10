import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}