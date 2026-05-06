import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { MarkAttendanceDto } from './dto/mark-attendance.dto';
export declare class AttendanceService {
    private readonly repo;
    constructor(repo: Repository<Attendance>);
    mark(dto: MarkAttendanceDto): Promise<Attendance>;
    getByDate(date: string, groupId?: string): Promise<Attendance[]>;
    getAbsentStudents(date: string, groupId: string): Promise<import("../students/entities/student.entity").Student[]>;
}
