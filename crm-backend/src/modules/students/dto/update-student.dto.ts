import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiPropertyOptional({
    description: 'Set when the student left the center (ISO date-time). Use null to clear.',
    example: '2026-05-01T10:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  leftAt?: string | null;
}