import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AssignTeacherDto } from './dto/assign-teacher.dto';
import { GroupsService } from './groups.service';
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(dto: CreateGroupDto): Promise<import("./entities/group.entity").Group>;
    findAll(): Promise<import("./entities/group.entity").Group[]>;
    findOne(id: string): Promise<import("./entities/group.entity").Group & {
        studentsCount: number;
    }>;
    update(id: string, dto: UpdateGroupDto): Promise<import("./entities/group.entity").Group>;
    assignTeacher(id: string, dto: AssignTeacherDto): Promise<import("./entities/group.entity").Group>;
    addStudent(id: string, studentId: string): Promise<{
        ok: boolean;
    }>;
    removeStudent(id: string, studentId: string): Promise<{
        ok: boolean;
    }>;
}
