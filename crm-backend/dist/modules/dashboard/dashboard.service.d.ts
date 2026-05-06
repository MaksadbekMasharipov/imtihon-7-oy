import { GroupsService } from '../groups/groups.service';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { PaymentsService } from '../payments/payments.service';
export declare class DashboardService {
    private readonly studentsService;
    private readonly teachersService;
    private readonly groupsService;
    private readonly paymentsService;
    constructor(studentsService: StudentsService, teachersService: TeachersService, groupsService: GroupsService, paymentsService: PaymentsService);
    totals(): Promise<{
        totalStudents: number;
        totalTeachers: number;
        totalGroups: number;
        studentsLeft: number;
    }>;
    monthlyStats(month: string): Promise<{
        month: string;
        paymentsCount: number;
        paymentsTotal: number;
    }>;
}
