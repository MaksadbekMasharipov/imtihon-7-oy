import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  fullName: string;

  @ApiProperty({ example: '+998901112233' })
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  phone: string;

  @ApiProperty({ example: 'Vali Aliyev' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  parentName: string;

  @ApiProperty({ example: '+998904445566' })
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  parentPhone: string;

  @ApiProperty({ example: 'Math' })
  @IsString()
  @MaxLength(120)
  direction: string;

  @ApiPropertyOptional({ example: 'https://cdn.example/photo.jpg' })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  image?: string;
}