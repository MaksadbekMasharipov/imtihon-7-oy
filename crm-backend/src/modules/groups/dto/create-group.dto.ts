import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Informatika' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name: string;

  @ApiProperty({ description: 'Teacher id', example: 'uuid' })
  @IsUUID()
  teacherId: string;

  @ApiProperty({ example: 'Mon-Wed-Fri' })
  @IsString()
  @MaxLength(50)
  days: string;

  @ApiProperty({ example: '14:00-16:00' })
  @IsString()
  @MaxLength(50)
  time: string;
}