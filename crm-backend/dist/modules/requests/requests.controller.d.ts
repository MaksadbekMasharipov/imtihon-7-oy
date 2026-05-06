import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestsService } from './requests.service';
export declare class RequestsController {
    private readonly requestsService;
    constructor(requestsService: RequestsService);
    create(dto: CreateRequestDto): Promise<import("./entities/contact-request.entity").ContactRequest>;
    findAll(query: PaginationQueryDto): Promise<import("../../common/dto/pagination-query.dto").PaginatedResult<import("./entities/contact-request.entity").ContactRequest>>;
    remove(id: string): Promise<void>;
}
