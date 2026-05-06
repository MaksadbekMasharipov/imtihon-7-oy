import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
import { AttendanceStatus } from '../../common/enums/attendance-status.enum';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repo: Repository<Attendance>,
  ) {}

  async mark(dto: MarkAttendanceDto) {
    const existing = await this.repo.findOne({
      where: { studentId: dto.studentId, groupId: dto.groupId, date: dto.date },
    });
    if (existing) {
      existing.status = dto.status;
      return this.repo.save(existing);
    }
    const record = this.repo.create(dto);
    return this.repo.save(record);
  }

  async getByDate(date: string, groupId?: string) {
    const where: Record<string, string> = { date };
    if (groupId) where.groupId = groupId;
    return this.repo.find({
      where,
      relations: ['student', 'group'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAbsentStudents(date: string, groupId: string) {
    const records = await this.repo.find({
      where: { date, groupId, status: AttendanceStatus.ABSENT },
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });
    return records.map((r) => r.student);
  }
}