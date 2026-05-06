import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  fullName: string;

  @ApiProperty({ example: '+998901112233' })
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  phone: string;

  @ApiPropertyOptional({ example: 'Wants trial lesson' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  note?: string;
}