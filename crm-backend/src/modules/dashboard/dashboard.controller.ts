import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { DashboardService } from './dashboard.service';
import { MonthlyStatsQueryDto } from './dto/monthly-stats-query.dto';

@ApiTags('dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.TEACHER)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('totals')
  @ApiOperation({ summary: 'Total students/teachers/groups + students left' })
  totals() {
    return this.dashboardService.totals();
  }

  @Get('monthly')
  @ApiOperation({ summary: 'Monthly stats (payments summary)' })
  monthly(@Query() query: MonthlyStatsQueryDto) {
    const month =
      query.month ?? new Date().toISOString().slice(0, 7); // YYYY-MM
    return this.dashboardService.monthlyStats(month);
  }
}