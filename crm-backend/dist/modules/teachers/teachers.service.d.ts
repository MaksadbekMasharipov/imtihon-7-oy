import { Repository } from 'typeorm';
import { PaginatedResult, PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersService {
    private readonly repo;
    constructor(repo: Repository<Teacher>);
    create(dto: CreateTeacherDto): Promise<Teacher>;
    findAll(query: PaginationQueryDto): Promise<PaginatedResult<Teacher>>;
    findOne(id: string): Promise<Teacher>;
    update(id: string, dto: UpdateTeacherDto): Promise<Teacher>;
    remove(id: string): Promise<void>;
    countAll(): Promise<number>;
}
