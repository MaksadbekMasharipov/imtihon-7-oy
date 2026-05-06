import { Repository } from 'typeorm';
import { PaginatedResult, PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsService {
    private readonly repo;
    constructor(repo: Repository<Student>);
    create(dto: CreateStudentDto): Promise<Student>;
    findAll(query: PaginationQueryDto): Promise<PaginatedResult<Student>>;
    findOne(id: string): Promise<Student>;
    update(id: string, dto: UpdateStudentDto): Promise<Student>;
    remove(id: string): Promise<void>;
    countActive(): Promise<number>;
    countLeft(): Promise<number>;
}
