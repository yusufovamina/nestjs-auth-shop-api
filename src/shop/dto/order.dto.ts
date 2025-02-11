import { IsString, IsMongoId, IsNumber, IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
