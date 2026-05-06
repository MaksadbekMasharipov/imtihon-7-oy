import { Repository } from 'typeorm';
import { PaginatedResult, PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { ContactRequest } from './entities/contact-request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
export declare class RequestsService {
    private readonly repo;
    constructor(repo: Repository<ContactRequest>);
    create(dto: CreateRequestDto): Promise<ContactRequest>;
    findAll(query: PaginationQueryDto): Promise<PaginatedResult<ContactRequest>>;
    remove(id: string): Promise<void>;
}
