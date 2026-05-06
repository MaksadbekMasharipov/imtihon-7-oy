import { Injectable } from '@nestjs/common';
import { GroupsService } from '../groups/groups.service';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { PaymentsService } from '../payments/payments.service';

function monthRangeUtc(month: string): { from: Date; to: Date } {
  const [y, m] = month.split('-').map((v) => parseInt(v, 10));
  const from = new Date(Date.UTC(y, m - 1, 1));
  const to = new Date(Date.UTC(y, m, 1));
  return { from, to };
}

@Injectable()
export class DashboardService {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
    private readonly groupsService: GroupsService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async totals() {
    const [studentsActive, studentsLeft, teachers, groups] = await Promise.all([
      this.studentsService.countActive(),
      this.studentsService.countLeft(),
      this.teachersService.countAll(),
      this.groupsService.countAll(),
    ]);
    return {
      totalStudents: studentsActive + studentsLeft,
      totalTeachers: teachers,
      totalGroups: groups,
      studentsLeft,
    };
  }

  async monthlyStats(month: string) {
    const { from, to } = monthRangeUtc(month);
    // Keep it simple/fast: use payments list and count in memory
    const payments = await this.paymentsService.list({
      from: from.toISOString().slice(0, 10),
      to: new Date(to.getTime() - 1).toISOString().slice(0, 10),
    });
    const paymentsTotal = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    return {
      month,
      paymentsCount: payments.length,
      paymentsTotal,
    };
  }
}