import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  studentId: string;

  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ example: '150000' })
  @IsNumberString()
  amount: string;

  @ApiProperty({ description: 'Payment date (YYYY-MM-DD)', example: '2026-05-04' })
  @IsDateString()
  paymentDate: string;
}