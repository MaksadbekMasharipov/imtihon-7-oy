import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsUUID } from 'class-validator';
import { AttendanceStatus } from '../../../common/enums/attendance-status.enum';

export class MarkAttendanceDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: 'Attendance date (YYYY-MM-DD)', example: '2026-05-04' })
  @IsDateString()
  date: string;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}