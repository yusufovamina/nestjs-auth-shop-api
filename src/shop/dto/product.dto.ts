import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ example: 'iPhone 15', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 999.99, description: 'Product price in AZN' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'Electronics', description: 'Product category' })
  @IsString()
  @IsNotEmpty()
  category: string;
}
