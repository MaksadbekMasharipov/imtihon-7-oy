import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationQueryDto,
} from '../../common/dto/pagination-query.dto';
import { ContactRequest } from './entities/contact-request.entity';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(ContactRequest)
    private readonly repo: Repository<ContactRequest>,
  ) {}

  async create(dto: CreateRequestDto): Promise<ContactRequest> {
    const entity = this.repo.create({
      fullName: dto.fullName,
      phone: dto.phone,
      note: dto.note ?? null,
    });
    return this.repo.save(entity);
  }

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<ContactRequest>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const qb = this.repo
      .createQueryBuilder('r')
      .orderBy('r.createdAt', 'DESC');

    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;
      qb.andWhere('(r.fullName ILIKE :term OR r.phone ILIKE :term)', { term });
    }

    const total = await qb.getCount();
    const data = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async remove(id: string): Promise<void> {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Request not found');
    await this.repo.remove(entity);
  }
}