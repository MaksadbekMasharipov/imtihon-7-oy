import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';
export declare class Payment {
    id: string;
    studentId: string;
    student: Student;
    groupId: string;
    group: Group;
    amount: string;
    paymentDate: string;
    createdAt: Date;
}
