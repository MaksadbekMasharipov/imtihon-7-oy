import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersService } from './teachers.service';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(dto: CreateTeacherDto): Promise<import("./entities/teacher.entity").Teacher>;
    findAll(query: PaginationQueryDto): Promise<import("../../common/dto/pagination-query.dto").PaginatedResult<import("./entities/teacher.entity").Teacher>>;
    findOne(id: string): Promise<import("./entities/teacher.entity").Teacher>;
    update(id: string, dto: UpdateTeacherDto): Promise<import("./entities/teacher.entity").Teacher>;
    remove(id: string): Promise<void>;
}
