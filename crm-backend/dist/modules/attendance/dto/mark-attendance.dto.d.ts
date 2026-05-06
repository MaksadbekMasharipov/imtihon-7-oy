import { AttendanceStatus } from '../../../common/enums/attendance-status.enum';
export declare class MarkAttendanceDto {
    studentId: string;
    groupId: string;
    date: string;
    status: AttendanceStatus;
}
