import { DashboardService } from './dashboard.service';
import { MonthlyStatsQueryDto } from './dto/monthly-stats-query.dto';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    totals(): Promise<{
        totalStudents: number;
        totalTeachers: number;
        totalGroups: number;
        studentsLeft: number;
    }>;
    monthly(query: MonthlyStatsQueryDto): Promise<{
        month: string;
        paymentsCount: number;
        paymentsTotal: number;
    }>;
}
