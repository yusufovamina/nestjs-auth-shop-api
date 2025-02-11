import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john_doe', description: 'Your username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'StrongPass123', description: 'Your password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
