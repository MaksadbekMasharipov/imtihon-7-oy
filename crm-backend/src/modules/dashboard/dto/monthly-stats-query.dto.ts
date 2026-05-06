import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class MonthlyStatsQueryDto {
  @ApiPropertyOptional({ description: 'Month in YYYY-MM format', example: '2026-05' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/)
  month?: string;
}