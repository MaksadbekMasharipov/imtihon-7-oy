import { Role } from '../../../common/enums/role.enum';
import { Teacher } from '../../teachers/entities/teacher.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    role: Role;
    teacher: Teacher | null;
    createdAt: Date;
}
