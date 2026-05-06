import { User } from '../../users/entities/user.entity';
import { Group } from '../../groups/entities/group.entity';
export declare class Teacher {
    id: string;
    fullName: string;
    phone: string;
    image: string | null;
    userId: string | null;
    user: User | null;
    groups: Group[];
    createdAt: Date;
}
