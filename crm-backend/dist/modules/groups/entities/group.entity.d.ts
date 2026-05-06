import { Teacher } from '../../teachers/entities/teacher.entity';
import { Student } from '../../students/entities/student.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { Payment } from '../../payments/entities/payment.entity';
export declare class Group {
    id: string;
    name: string;
    teacherId: string;
    teacher: Teacher;
    days: string;
    time: string;
    students: Student[];
    attendanceRecords: Attendance[];
    payments: Payment[];
    createdAt: Date;
}
