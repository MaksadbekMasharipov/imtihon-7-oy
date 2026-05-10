import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { AttendanceService } from './attendance.service';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';

@ApiTags('attendance')
// @ApiBearerAuth() // temporarily open for testing
// @UseGuards(JwtAuthGuard, RolesGuard) // temporarily open for testing
// @Roles(Role.ADMIN, Role.TEACHER) // temporarily open for testing
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Mark attendance (upsert per student+group+date)' })
  mark(@Body() dto: MarkAttendanceDto) {
    return this.attendanceService.mark(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get attendance by date (optional groupId)' })
  @ApiQuery({ name: 'date', required: true, example: '2026-05-04' })
  @ApiQuery({ name: 'groupId', required: false })
  getByDate(@Query('date') date: string, @Query('groupId') groupId?: string) {
    return this.attendanceService.getByDate(date, groupId);
  }

  @Get('absent')
  @ApiOperation({ summary: 'Get absent students list by date + groupId' })
  @ApiQuery({ name: 'date', required: true, example: '2026-05-04' })
  @ApiQuery({ name: 'groupId', required: true })
  absent(@Query('date') date: string, @Query('groupId') groupId: string) {
    return this.attendanceService.getAbsentStudents(date, groupId);
  }
}