import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssignTeacherDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  teacherId: string;
}