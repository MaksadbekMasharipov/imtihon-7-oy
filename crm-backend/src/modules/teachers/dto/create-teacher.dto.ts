import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Otabek Karimov' })
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  fullName: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  phone: string;

  @ApiPropertyOptional({ example: 'https://cdn.example/teacher.jpg' })
  @IsOptional()
  @IsUrl({ require_protocol: true })
  image?: string;
}