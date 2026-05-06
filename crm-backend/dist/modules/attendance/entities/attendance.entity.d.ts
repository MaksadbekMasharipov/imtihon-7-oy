import { AttendanceStatus } from '../../../common/enums/attendance-status.enum';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';
export declare class Attendance {
    id: string;
    studentId: string;
    student: Student;
    groupId: string;
    group: Group;
    date: string;
    status: AttendanceStatus;
    createdAt: Date;
}
