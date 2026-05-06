import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { TeachersService } from '../teachers/teachers.service';
import { StudentsService } from '../students/students.service';
export declare class GroupsService {
    private readonly repo;
    private readonly teachersService;
    private readonly studentsService;
    constructor(repo: Repository<Group>, teachersService: TeachersService, studentsService: StudentsService);
    create(dto: CreateGroupDto): Promise<Group>;
    findAll(): Promise<Group[]>;
    findOneWithStudentsCount(id: string): Promise<Group & {
        studentsCount: number;
    }>;
    update(id: string, dto: UpdateGroupDto): Promise<Group>;
    assignTeacher(id: string, teacherId: string): Promise<Group>;
    addStudent(groupId: string, studentId: string): Promise<{
        ok: boolean;
    }>;
    removeStudent(groupId: string, studentId: string): Promise<{
        ok: boolean;
    }>;
    countAll(): Promise<number>;
}
