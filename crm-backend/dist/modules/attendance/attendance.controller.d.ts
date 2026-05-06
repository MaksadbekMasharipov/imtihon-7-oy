import { AttendanceService } from './attendance.service';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    mark(dto: MarkAttendanceDto): Promise<import("./entities/attendance.entity").Attendance>;
    getByDate(date: string, groupId?: string): Promise<import("./entities/attendance.entity").Attendance[]>;
    absent(date: string, groupId: string): Promise<import("../students/entities/student.entity").Student[]>;
}
