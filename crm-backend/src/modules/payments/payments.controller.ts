import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.TEACHER)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Make payment' })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get payments list (filter by date)' })
  @ApiQuery({ name: 'from', required: false, example: '2026-05-01' })
  @ApiQuery({ name: 'to', required: false, example: '2026-05-31' })
  @ApiQuery({ name: 'studentId', required: false })
  @ApiQuery({ name: 'groupId', required: false })
  list(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('studentId') studentId?: string,
    @Query('groupId') groupId?: string,
  ) {
    return this.paymentsService.list({ from, to, studentId, groupId });
  }

  @Get('unpaid')
  @ApiOperation({ summary: 'Get unpaid students for a group in a month' })
  @ApiQuery({ name: 'groupId', required: true })
  @ApiQuery({ name: 'month', required: true, example: '2026-05' })
  unpaid(@Query('groupId') groupId: string, @Query('month') month: string) {
    return this.paymentsService.unpaidStudents(groupId, month);
  }
}