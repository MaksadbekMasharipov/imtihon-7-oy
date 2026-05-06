import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(dto: CreateStudentDto): Promise<import("./entities/student.entity").Student>;
    findAll(query: PaginationQueryDto): Promise<import("../../common/dto/pagination-query.dto").PaginatedResult<import("./entities/student.entity").Student>>;
    findOne(id: string): Promise<import("./entities/student.entity").Student>;
    update(id: string, dto: UpdateStudentDto): Promise<import("./entities/student.entity").Student>;
    remove(id: string): Promise<void>;
}
