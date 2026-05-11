import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { GroupsService } from './groups.service';

@ApiTags('groups')
@ApiBearerAuth('access-token') // temporarily open for testing
@UseGuards(JwtAuthGuard, RolesGuard) // temporarily open for testing
@Roles(Role.ADMIN, Role.SUPERADMIN) // temporarily open for testing
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create group' })
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single group with students count' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.groupsService.findOneWithStudentsCount(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update group' })
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() dto: UpdateGroupDto) {
    return this.groupsService.update(id, dto);
  }

  @Patch(':id/teacher')
  @ApiOperation({ summary: 'Assign teacher to group' })
  @ApiParam({ name: 'id' })
  assignTeacher(@Param('id') id: string, @Body() dto: AssignTeacherDto) {
    return this.groupsService.assignTeacher(id, dto.teacherId);
  }

  @Post(':id/students/:studentId')
  @ApiOperation({ summary: 'Add student to group' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'studentId' })
  addStudent(@Param('id') id: string, @Param('studentId') studentId: string) {
    return this.groupsService.addStudent(id, studentId);
  }

  @Delete(':id/students/:studentId')
  @ApiOperation({ summary: 'Remove student from group' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'studentId' })
  removeStudent(@Param('id') id: string, @Param('studentId') studentId: string) {
    return this.groupsService.removeStudent(id, studentId);
  }
}