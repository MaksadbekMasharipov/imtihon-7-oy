import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, IsNull, Repository } from 'typeorm';
import {
  PaginatedResult,
  PaginationQueryDto,
} from '../../common/dto/pagination-query.dto';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const entity = this.repo.create({
      ...dto,
      image: dto.image ?? null,
      leftAt: null,
    });
    return this.repo.save(entity);
  }

  async findAll(query: PaginationQueryDto): Promise<PaginatedResult<Student>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const qb = this.repo
      .createQueryBuilder('s')
      .orderBy('s.createdAt', 'DESC');

    if (query.search?.trim()) {
      const term = `%${query.search.trim()}%`;
      qb.andWhere(
        new Brackets((w) => {
          w.where('s.fullName ILIKE :term', { term })
            .orWhere('s.phone ILIKE :term', { term })
            .orWhere('s.parentName ILIKE :term', { term })
            .orWhere('s.parentPhone ILIKE :term', { term })
            .orWhere('s.direction ILIKE :term', { term });
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

  async findOne(id: string): Promise<Student> {
    const student = await this.repo.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, {
      ...dto,
      image: dto.image === undefined ? student.image : dto.image ?? null,
      leftAt:
        dto.leftAt === undefined
          ? student.leftAt
          : dto.leftAt
            ? new Date(dto.leftAt)
            : null,
    });
    return this.repo.save(student);
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await this.repo.remove(student);
  }

  async countActive(): Promise<number> {
    return this.repo.count({ where: { leftAt: IsNull() } });
  }

  async countLeft(): Promise<number> {
    return this.repo.createQueryBuilder('s').where('s.leftAt IS NOT NULL').getCount();
  }
}