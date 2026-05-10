import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create request (public)' })
  create(@Body() dto: CreateRequestDto) {
    return this.requestsService.create(dto);
  }

  @Get()
  // @ApiBearerAuth() // temporarily open for testing
  // @UseGuards(JwtAuthGuard, RolesGuard) // temporarily open for testing
  // @Roles(Role.ADMIN) // temporarily open for testing
  @ApiOperation({ summary: 'Get all requests (public for testing)' })
  findAll(@Query() query: PaginationQueryDto) {
    return this.requestsService.findAll(query);
  }

  @Delete(':id')
  // @ApiBearerAuth() // temporarily open for testing
  // @UseGuards(JwtAuthGuard, RolesGuard) // temporarily open for testing
  // @Roles(Role.ADMIN) // temporarily open for testing
  @ApiOperation({ summary: 'Delete request (public for testing)' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}