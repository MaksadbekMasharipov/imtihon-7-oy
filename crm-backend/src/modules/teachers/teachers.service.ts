import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationQueryDto,
} from '../../common/dto/pagination-query.dto';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly repo: Repository<Teacher>,
  ) {}

  async create(dto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.repo.create({
      ...dto,
      image: dto.image ?? null,
      userId: null,
    });
    return this.repo.save(teacher);
  }

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<Teacher>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const qb = this.repo
      .createQueryBuilder('t')
      .orderBy('t.createdAt', 'DESC');

    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;
      qb.andWhere(
        new Brackets((w) => {
          w.where('t.fullName ILIKE :term', { term }).orWhere(
            't.phone ILIKE :term',
            { term },
          );
        }),
      );
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

  async findOne(id: string): Promise<Teacher> {
    const teacher = await this.repo.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }

  async update(id: string, dto: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.findOne(id);
    Object.assign(teacher, {
      ...dto,
      image: dto.image === undefined ? teacher.image : dto.image ?? null,
    });
    return this.repo.save(teacher);
  }

  async remove(id: string): Promise<void> {
    const teacher = await this.findOne(id);
    await this.repo.remove(teacher);
  }

  async countAll(): Promise<number> {
    return this.repo.count();
  }
}