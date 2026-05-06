import { Group } from '../../groups/entities/group.entity';
export declare class Student {
    id: string;
    fullName: string;
    phone: string;
    parentName: string;
    parentPhone: string;
    direction: string;
    image: string | null;
    leftAt: Date | null;
    groups: Group[];
    createdAt: Date;
}
